import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  ScrollView,
  StatusBar,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import dispatch from '../../rematch/dispatch';
import { verticalSwipe } from '../../rematch/stories';
import DisableBodyScrollingView from '../DisableScrolling';
import Story from './Story';

const { width, height } = Dimensions.get('window');
const halfWidth = width * 0.5;
const perspective = width;
const angle = Math.atan(perspective / halfWidth);
const ratio = 2; //Platform.OS === 'ios' ? 2 : 1.2;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

function isValidSwipe(
  velocity,
  velocityThreshold,
  directionalOffset,
  directionalOffsetThreshold,
) {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalOffset) < directionalOffsetThreshold
  );
}
class StoriesView extends React.Component {
  horizontalSwipe = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.onScroll = Animated.event(
      [
        {
          nativeEvent: { contentOffset: { x: this.horizontalSwipe } },
        },
      ],
      {
        useNativeDriver: Platform.OS !== 'web',
      },
    );
    this.swipeConfig = Object.assign(swipeConfig, props.config);

    this.panResponder = PanResponder.create({
      //   onMoveShouldSetResponderCapture: () => true,
      //   onStartShouldSetPanResponder: this._handleShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponderCapture,
      onMoveShouldSetPanResponderCapture: this
        ._onMoveShouldSetPanResponderCapture,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onPanResponderGrant: () => {
        // console.log('Start Gesture');
        // dispatch().stories.onPanResponderGrant();
        dispatch().stories.pause();
        dispatch().stories.setBackOpacity(0);
      },
      onPanResponderMove: (e, gesture) => {
        // console.log('onPanResponderMove');
        dispatch().stories.onPanResponderMove({ e, gesture });
      },
    });
  }

  _onMoveShouldSetPanResponderCapture = (
    { nativeEvent: { touches } },
    { dy },
  ) => {
    // if (Math.abs(dx) > 5) {
    //   dispatch().stories.update({ swipedHorizontally: true });
    //   return true;
    // }
    const isSingleFinger = touches.length === 1;

    if (isSingleFinger && dy > 5) {
      dispatch().stories.update({ swipedHorizontally: false });
      return true;
    }
    // console.log('should capture: ', isSingleFinger);
    dispatch().stories.update({ swipedHorizontally: true });

    return false;
  };

  _triggerSwipeHandlers = (swipeDirection, gestureState) => {
    const {
      onSwipe,
      onSwipeUp,
      onSwipeDown,
      onSwipeLeft,
      onSwipeRight,
      onTap,
    } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    onSwipe && onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        onSwipeUp && onSwipeUp(gestureState);
        break;
      case SWIPE_DOWN:
        onSwipeDown && onSwipeDown(gestureState);
        break;
      default:
        onTap && onTap(gestureState);
        break;
    }
  };

  _getSwipeDirection = gestureState => {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    const { dx, dy } = gestureState;
    if (this._isValidHorizontalSwipe(gestureState)) {
      return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
    } else if (this._isValidVerticalSwipe(gestureState)) {
      return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
    }
    return null;
  };

  _handlePanResponderEnd = (evt, gestureState) => {
    const direction = this._getSwipeDirection(gestureState);

    // console.log('End Gesture', direction);
    // this._triggerSwipeHandlers(swipeDirection, gestureState);
    dispatch().stories.onPanResponderRelease({ direction });
  };

  _isValidHorizontalSwipe = gestureState => {
    const { vx, dy } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  };

  _isValidVerticalSwipe = gestureState => {
    const { vy, dx } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  };

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  renderItem = ({ item, index }) => {
    return (
      <Animated.View
        style={[
          { position: 'absolute', top: 0, left: 0, width, height },
          { transform: this._getTransformsFor(index) },
        ]}
        key={`child-${index}`}
      >
        <Animated.View style={[this._getDismissTransformsFor(index)]}>
          <Story story={item} currentDeck={this.props.deckIdx === index} />
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'black' },
              this._getOpacityFor(index),
            ]}
          />
        </Animated.View>
      </Animated.View>
    );
  };

  _getOpacityFor = i => {
    let pageX = width * i;
    let opacity = this.horizontalSwipe.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      outputRange: [0.9, 0, 0.9],
      extrapolate: 'clamp',
    });

    return {
      opacity,
    };
  };

  _renderPlaceholders = (child, i) => {
    return (
      <View
        key={`placeholder-${i}`}
        pointerEvents={'none'}
        style={{ width, height }}
      />
    );
  };

  _getTransformsFor = i => {
    let scrollX = this.horizontalSwipe;
    let pageX = width * i;
    let translateX = scrollX.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      outputRange: [width / 2, 0, -width / 2],
      extrapolate: 'clamp',
    });

    let rotateY = scrollX.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      outputRange: ['60deg', '0deg', '-60deg'],
      extrapolate: 'clamp',
    });

    let translateXAfterRotate = scrollX.interpolate({
      //   inputRange: [pageX - width, pageX, pageX + width],
      inputRange: [
        pageX - width,
        pageX - width + 0.1,
        pageX,
        pageX + width - 0.1,
        pageX + width,
      ],
      outputRange: [width, width / 2.38, 0, -width / 2.38, -width],
      extrapolate: 'clamp',
    });

    return [
      { perspective: width },
      { translateX },
      { rotateY },
      { translateX: translateXAfterRotate },
    ];
  };

  _getDismissTransformsFor = i => {
    const dismissTranslationY = {
      translateY: verticalSwipe.interpolate({
        inputRange: [-1, 0, height, height * 2],
        outputRange: [0, 0, height / 2, height * -0.5 + this.props.offset.top],
      }),
    };

    const halfWidth = Dimensions.get('window').width / 2;
    const dismissTranslationX = {
      translateX: verticalSwipe.interpolate({
        inputRange: [-100, 0, height, height * 2],
        outputRange: [0, 0, 0, this.props.offset.left - halfWidth],
      }),
    };
    // const dismissOpacity = verticalSwipe.interpolate({
    //   inputRange: [0, height * 1.7, height * 2],
    //   outputRange: [1, 1, 0],
    //   extrapolateLeft: 'clamp',
    // });

    // const dismissRadius = verticalSwipe.interpolate({
    //   inputRange: [0, height, height * 2],
    //   outputRange: [0, 0, halfWidth],
    //   extrapolate: 'clamp',
    // });

    let scale = 1;

    if (!this.props.swipedHorizontally) {
      scale = verticalSwipe.interpolate({
        inputRange: [-1, 0, height, height * 2],
        outputRange: [1, 1, 0.75, 56 / Dimensions.get('window').width],
      });
    }
    return {
      // opacity: dismissOpacity,
      // borderRadius: dismissRadius,
      overflow: 'hidden',
      transform: [dismissTranslationY, dismissTranslationX, { scale }],
    };
  };

  get node() {
    if (!this.viewPager || !this.viewPager._component) {
      return null;
    }
    return this.viewPager._component;
  }

  componentDidUpdate(prevProps) {
    if (this.props.deckIdx !== prevProps.deckIdx) {
      if (this.node) {
        this.node.scrollTo({ x: this.props.deckIdx * width, duration: 1000 });
      }
    }
  }

  render() {
    const { stories = [] } = this.props;

    return (
      <DisableBodyScrollingView
        shouldDisable={(e, { state, dy }) => {
          return state === 'MOVED' && dy > 3;
        }}
      >
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            styles.container,
            {
              opacity: verticalSwipe.interpolate({
                inputRange: [0, height * 1.6, height * 2],
                outputRange: [1, 1, 0],
                extrapolateLeft: 'clamp',
              }),
            },
          ]}
        >
          <AnimatedScrollView
            ref={ref => (this.viewPager = ref)}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            horizontal
            style={{ flex: 1 }}
            bounces={false}
            alwaysBounceHorizontal={false}
            showsHorizontalScrollIndicator={false}
            data={stories}
            pagingEnabled
          >
            <Animated.View
              style={[
                { position: 'absolute', top: 0, left: 0, width, height },
                { transform: [{ translateX: this.horizontalSwipe }] },
              ]}
            >
              {stories.map((item, index) => this.renderItem({ item, index }))}
            </Animated.View>
            {this.props.stories.map(this._renderPlaceholders)}
          </AnimatedScrollView>
        </Animated.View>
      </DisableBodyScrollingView>
    );
  }
}

export default connect(({ stories }) => ({ ...stories }))(StoriesView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  deck: {
    width,
    height,
  },
});
