import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import dispatch from '../../rematch/dispatch';
import { verticalSwipe } from '../../rematch/stories';
import Story from './Story';

const { width, height } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
        useNativeDriver: true,
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
        dispatch().stories.pause();
        dispatch().stories.setBackOpacity(0);
      },
      onPanResponderMove: (e, gesture) => {
        dispatch().stories.onPanResponderMove({ e, gesture });
      },
    });
  }

  _onMoveShouldSetPanResponderCapture = ({ nativeEvent }, { dy }) => {
    const { touches } = nativeEvent;
    // if (Math.abs(dx) > 5) {
    //   dispatch().stories.update({ swipedHorizontally: true });
    //   return true;
    // }
    const isSingleFinger = touches.length === 1;

    if (isSingleFinger && dy > 5) {
      nativeEvent.preventDefault();

      dispatch().stories.update({ swipedHorizontally: false });
      return true;
    }
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

  renderItem = ({ item, index }) => {
    return (
      <Animated.View
        style={[{ width, height, transform: this._getTransformsFor(index) }]}
        key={`child-${index}`}
      >
        <Story story={item} currentDeck={this.props.deckIdx === index} />
        <Animated.View
          pointerEvents={'none'}
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'black' },
            this._getOpacityFor(index),
          ]}
        />
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

  _getTransformsFor = i => {
    let scrollX = this.horizontalSwipe;
    let pageX = width * i;
    // let translateX = scrollX.interpolate({
    //   inputRange: [pageX - width, pageX, pageX + width],
    //   outputRange: [width / 2, 0, -width / 2],
    //   extrapolate: 'clamp',
    // });

    // let rotateY = scrollX.interpolate({
    //   inputRange: [pageX - width, pageX, pageX + width],
    //   outputRange: ['60deg', '0deg', '-60deg'],
    //   extrapolate: 'clamp',
    // });

    // let translateXAfterRotate = scrollX.interpolate({
    //   //   inputRange: [pageX - width, pageX, pageX + width],
    //   inputRange: [pageX - width, pageX - width + 0.1, pageX, pageX + width - 0.1, pageX + width],
    //   outputRange: [width, width / 2.38, 0, -width / 2.38, -width],
    //   extrapolate: 'clamp',
    // });

    const dismissTranslationY = {
      translateY: verticalSwipe.interpolate({
        inputRange: [-1, 0, height],
        outputRange: [0, 0, height / 2],
      }),
    };

    let scale = 1;

    if (!this.props.swipedHorizontally) {
      scale = verticalSwipe.interpolate({
        inputRange: [-1, 0, height],
        outputRange: [1, 1, 0.75],
      });
    }

    return [
      //   { perspective: width },
      //   { translateX },
      //   { rotateY },
      //   { translateX: translateXAfterRotate },
      dismissTranslationY,
      { scale },
    ];
  };

  get node() {
    if (!this.list || !this.list.getNode) {
      return null;
    }
    return this.list.getNode();
  }

  componentDidUpdate(prevProps) {
    if (this.props.deckIdx !== prevProps.deckIdx) {
      this.scrollToIndex(this.props.deckIdx);
    }
  }

  componentDidMount() {
    StatusBar.setHidden(true);

    this.scrollToIndex(this.props.deckIdx, false);
  }

  scrollToIndex = (index, animated = true) => {
    if (this.node) {
      this.pendingIndex = null;
      this.node.scrollToIndex({ index, animated });
    } else {
      this.pendingIndex = index;
    }
  };

  getItemLayout = (data, index) => {
    return {
      length: width,
      offset: width * index,
      index,
    };
  };

  render() {
    const { stories = [] } = this.props;
    return (
      <View style={styles.container}>
        <AnimatedFlatList
          {...this.panResponder.panHandlers}
          ref={ref => {
            this.list = ref;
            if (this.pendingIndex != null) {
              this.scrollToIndex(this.pendingIndex, false);
            }
          }}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          horizontal
          getItemLayout={this.getItemLayout}
          style={{ flex: 1 }}
          bounces={false}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          data={stories}
          renderItem={this.renderItem}
          pagingEnabled
        />
      </View>
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
