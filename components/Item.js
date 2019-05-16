import React from 'react';
import PropTypes from 'prop-types';
import {
  UIManager,
  findNodeHandle,
  View,
  Animated,
  PanResponder,
  Easing,
} from 'react-native';

import ItemFooter from './ItemFooter';
import ItemHeader from './ItemHeader';
import ItemImage from './ItemImage';
import DisableBodyScrollingView from './DisableScrolling';
// @flow

export function pow2abs(a, b) {
  return Math.pow(Math.abs(a - b), 2);
}

export function getDistance(touches) {
  const [a, b] = touches;
  if (a == null || b == null) {
    return 0;
  }
  return Math.sqrt(pow2abs(a.pageX, b.pageX) + pow2abs(a.pageY, b.pageY));
}

export function getPosition(touches) {
  const [a, b] = touches;
  if (a == null || b == null) {
    return { x: 0, y: 0 };
  }
  return { x: a.pageX, y: a.pageY };
}

export function getDeltaTranslation(position, initial) {
  return { x: position.x - initial.x, y: position.y - initial.y };
}

const SCALE_MULTIPLIER = 1.2;

export function getScale(currentDistance, initialDistance) {
  return (currentDistance / initialDistance) * SCALE_MULTIPLIER;
}

export function measureNode(node, parent) {
  return new Promise((resolve, reject) => {
    UIManager.measureLayout(
      node,
      parent || (node && node.parentNode),
      e => reject(e),
      (x, y, w, h, l, t) => {
        resolve({ x, y, w, h });
      },
    );
  });
  // return new Promise((resolve, reject) => {
  //   UIManager.measureLayout(
  //     node,
  //     parent || (node && node.parentNode),
  //     e => reject(e),
  //     (x, y, w, h, l, t) => {
  //       resolve({ x, y, w, h });
  //     },
  //   );
  // });
}
const RESTORE_ANIMATION_DURATION = 200;

class Item extends React.PureComponent {
  _opacity = new Animated.Value(1);
  _initialTouches = [];

  static contextTypes = {
    gesturePosition: PropTypes.object,
    scaleValue: PropTypes.object,
    getScrollPosition: PropTypes.func,
  };

  constructor(props) {
    super(props);
    console.log(UIManager);
    this._generatePanHandlers();
  }

  _generatePanHandlers = () => {
    this._gestureHandler = PanResponder.create({
      onStartShouldSetResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: ({ nativeEvent }) => {
        return nativeEvent.touches.length === 2;
      },
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: ({ nativeEvent }) => {
        return nativeEvent.touches.length === 2;
      },
      onPanResponderGrant: this._startGesture,
      onPanResponderMove: this._onGestureMove,
      onPanResponderRelease: this._onGestureRelease,
      onPanResponderTerminationRequest: () => {
        return this._gestureInProgress == null;
      },
      onPanResponderTerminate: (event, gestureState) => {
        return this._onGestureRelease(event, gestureState);
      },
    });
  };

  _startGesture = async (event, gestureState) => {
    // Sometimes gesture start happens two or more times rapidly.
    if (this._gestureInProgress) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    console.log('start');
    this._gestureInProgress = gestureState.stateID;
    let { item, onGestureStart } = this.props;
    let { gesturePosition, getScrollPosition } = this.context;
    let { touches } = event.nativeEvent;

    this._initialTouches = touches;

    let selectedPhotoMeasurement = await this._measureSelectedPhoto();
    this._selectedPhotoMeasurement = selectedPhotoMeasurement;
    onGestureStart({
      source: item.source,
      measurement: selectedPhotoMeasurement,
    });

    gesturePosition.setValue({
      x: 0,
      y: 0,
    });

    gesturePosition.setOffset({
      x: 0,
      y: selectedPhotoMeasurement.y, // - getScrollPosition(),
    });

    Animated.timing(this._opacity, {
      toValue: 0,
      duration: 200,
    }).start();
  };

  _onGestureMove = (event, gestureState) => {
    let { touches } = event.nativeEvent;
    if (!this._gestureInProgress) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    // console.log('move', event);
    if (touches.length < 2) {
      // Trigger a realease
      this._onGestureRelease(event, gestureState);
      return;
    }

    // for moving photo around
    let { gesturePosition, scaleValue } = this.context;
    let { dx, dy } = gestureState;
    let currentPosition = getPosition(touches);
    let initialPosition = getPosition(this._initialTouches);

    const { x, y } = getDeltaTranslation(currentPosition, initialPosition);
    console.log('move', x, y);
    gesturePosition.x.setValue(x);
    gesturePosition.y.setValue(y);

    // for scaling photo
    let currentDistance = getDistance(touches);
    let initialDistance = getDistance(this._initialTouches);
    let newScale = getScale(currentDistance, initialDistance);
    scaleValue.setValue(newScale);
  };

  _onGestureRelease = (event, gestureState) => {
    if (this._gestureInProgress !== gestureState.stateID) {
      return;
    }

    console.log('end');
    this._gestureInProgress = null;
    this._initialTouches = [];
    let { onGestureRelease } = this.props;
    let { gesturePosition, scaleValue, getScrollPosition } = this.context;

    // set to initial position and scale
    Animated.parallel([
      Animated.timing(gesturePosition.x, {
        toValue: 0,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        // useNativeDriver: true,
      }),
      Animated.timing(gesturePosition.y, {
        toValue: 0,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        // useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        // useNativeDriver: true,
      }),
    ]).start(() => {
      gesturePosition.setOffset({
        x: 0,
        y:
          (this._selectedPhotoMeasurement &&
            this._selectedPhotoMeasurement.y) ||
          0 - getScrollPosition(),
      });

      this._opacity.setValue(1);

      requestAnimationFrame(() => {
        onGestureRelease();
      });
    });
  };

  _measureSelectedPhoto = async () => {
    const list = findNodeHandle(this.props.getParent());
    let parent = findNodeHandle(this._parent);
    let photoComponent = findNodeHandle(this._photoComponent);

    try {
      console.log(photoComponent);
      // let photoMeasurement = {}; // measureNode(photoComponent);
      // let parentMeasurement = await measureNode(parent);
      let [parentMeasurement, photoMeasurement] = await Promise.all([
        measureNode(parent, list),
        measureNode(photoComponent, parent),
      ]);

      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = photoComponent.getBoundingClientRect();
      const offset = elemRect.top + window.scrollY;

      console.log(photoMeasurement, parentMeasurement, offset);
      return {
        x: photoMeasurement.x,
        y: offset, //parentMeasurement.y + photoMeasurement.y,
        w: photoMeasurement.w,
        h: photoMeasurement.h,
      };
    } catch (error) {
      console.log('ERROR', error);
    }
    return {};
  };

  render() {
    const { imageWidth, imageHeight, item } = this.props;
    return (
      <View ref={parentNode => (this._parent = parentNode)}>
        <ItemHeader item={item} />
        <DisableBodyScrollingView>
          <Animated.View
            {...this._gestureHandler.panHandlers}
            testID="webkit-disable-touches"
            style={{
              opacity: this._opacity,
            }}
          >
            <ItemImage
              ref={node => (this._photoComponent = node)}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              source={item.source}
            />
          </Animated.View>
        </DisableBodyScrollingView>

        <ItemFooter item={item} />
      </View>
    );
  }
}
export default Item;
