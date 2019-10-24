import PropTypes from 'prop-types';
import React from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';

import { Stories } from '../constants/Posts';
import FeedListFooter from './FeedListFooter';
import Item from './Item';
import StorySlider from './StorySlider';

export const profileImageSize = 32;

export default class FeedList extends React.Component {
  static defaultProps = {
    ListHeaderComponent: props => <StorySlider stories={Stories} />,
  };

  _scrollValue = new Animated.Value(0);
  _scaleValue = new Animated.Value(1);
  _gesturePosition = new Animated.ValueXY();
  state = {
    isDragging: false,
  };

  static childContextTypes = {
    gesturePosition: PropTypes.object,
    getScrollPosition: PropTypes.func,
    scaleValue: PropTypes.object,
  };

  state = {
    isDragging: false,
  };

  getChildContext() {
    return {
      gesturePosition: this._gesturePosition,
      scaleValue: this._scaleValue,
      getScrollPosition: () => {
        return this._scrollValue.__getValue();
      },
    };
  }

  render() {
    const { onPressFooter, ...props } = this.props;

    let { isDragging, selectedPhoto } = this.state;
    let onScroll = Animated.event([
      { nativeEvent: { contentOffset: { y: this._scrollValue } } },
    ]);

    return (
      <React.Fragment>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: 'transparent' }}
          ref={ref => (this.list = ref)}
          scrollEventThrottle={16}
          onScroll={onScroll}
          scrollEnabled={!isDragging}
          zoomScale={1}
          bouncesZoom={false}
          maximumZoomScale={1}
          minimumZoomScale={1}
          renderItem={({ item }) => (
            <Item
              isLarge={props.isLarge}
              getParent={() => this.list}
              isDragging={isDragging}
              onGestureStart={selectedPhoto => {
                this.setState({
                  selectedPhoto,
                  isDragging: true,
                });
              }}
              onGestureRelease={() => this.setState({ isDragging: false })}
              item={item}
            />
          )}
          ListFooterComponent={props => (
            <FeedListFooter {...props} onPress={onPressFooter} />
          )}
          keyExtractor={(item, index) => item.key + ' ' + index}
          {...props}
        />
        {isDragging ? (
          <SelectedPhoto
            key={selectedPhoto ? selectedPhoto.photoURI : ''}
            selectedPhoto={selectedPhoto}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

class SelectedPhoto extends React.Component {
  state = { isLoaded: false };

  static contextTypes = {
    gesturePosition: PropTypes.object,
    scrollValue: PropTypes.object,
    scaleValue: PropTypes.object,
  };

  render() {
    let { selectedPhoto } = this.props;
    let { isLoaded } = this.state;

    let { gesturePosition, scaleValue } = this.context;

    let animatedStyle = {
      transform: gesturePosition.getTranslateTransform(),
    };
    animatedStyle.transform.push({
      scale: scaleValue,
    });

    let imageStyle = [
      {
        position: 'absolute',
        zIndex: 10,
        width: selectedPhoto.measurement.w,
        height: selectedPhoto.measurement.h,
        opacity: isLoaded ? 1 : 0,
      },
      animatedStyle,
    ];

    let backgroundOpacityValue = scaleValue.interpolate({
      inputRange: [1.0, 1.1, 2.0],
      outputRange: [0.0, 0.15, 0.75],
      extrapolate: 'clamp',
    });

    return (
      <BodyPortal>
        <View style={styles.root}>
          <Animated.View
            style={[
              styles.background,
              {
                opacity: backgroundOpacityValue,
              },
            ]}
          />
          <Animated.Image
            style={imageStyle}
            onLoad={() => {
              setTimeout(() => {
                this.setState({ isLoaded: true });
              });
            }}
            source={selectedPhoto.source}
          />
        </View>
      </BodyPortal>
    );
  }
}

import ReactDOM from 'react-dom';

export class BodyPortal extends React.PureComponent {
  render() {
    return ReactDOM.createPortal(this.props.children, global.document.body);
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
