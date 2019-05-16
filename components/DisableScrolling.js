import React from 'react';
import { findDOMNode } from 'react-dom';
import { View } from 'react-native';

const getElement = component => {
  try {
    return findDOMNode(component);
  } catch (e) {
    return component;
  }
};

class DisableBodyScrollingView extends React.Component {
  static defaultProps = {
    shouldDisable: e => {
      return e.touches.length > 1;
    },
  };
  componentWillUnmount() {
    if (this.view) {
      this.view.removeEventListener('touchstart', this.freezeBodyStart, false);
      this.view.removeEventListener('touchmove', this.freezeBodyMove, false);
    }
  }
  start = { x: 0, y: 0 };
  freezeBodyStart = e => {
    this.start.x = e.touches[0].pageX;
    this.start.y = e.touches[0].pageY;

    if (this.props.shouldDisable(e, { state: 'BEGAN', dx: 0, dy: 0 })) {
      e.preventDefault();
    }
  };

  freezeBodyMove = e => {
    let delta = {
      state: 'MOVED',
      dx: this.start.x - e.touches[0].pageX,
      dy: this.start.y - e.touches[0].pageY,
    };

    if (this.props.shouldDisable(e, delta)) {
      e.preventDefault();
    }
  };

  render() {
    const { style, ...props } = this.props;

    return (
      <View
        style={[{ flex: 1 }, style]}
        tabIndex="0"
        ref={view => {
          const nextView = getElement(view);
          if (nextView && nextView.addEventListener) {
            nextView.addEventListener(
              'touchstart',
              this.freezeBodyStart,
              false,
            );
            nextView.addEventListener('touchmove', this.freezeBodyMove, false);
          }
          if (this.view && this.view.removeEventListener) {
            this.view.removeEventListener(
              'touchstart',
              this.freezeBodyStart,
              false,
            );
            this.view.removeEventListener(
              'touchmove',
              this.freezeBodyMove,
              false,
            );
          }
          this.view = nextView;
        }}
        {...props}
      />
    );
  }
}

export default DisableBodyScrollingView;
