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
      this.view.removeEventListener('touchstart', this.freezeBody, false);
      this.view.removeEventListener('touchmove', this.freezeBody, false);
    }
  }

  freezeBody = e => {
    if (this.props.shouldDisable(e)) {
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
            nextView.addEventListener('touchstart', this.freezeBody, false);
            nextView.addEventListener('touchmove', this.freezeBody, false);
          }
          if (this.view && this.view.removeEventListener) {
            this.view.removeEventListener('touchstart', this.freezeBody, false);
            this.view.removeEventListener('touchmove', this.freezeBody, false);
          }
          this.view = nextView;
        }}
        {...props}
      />
    );
  }
}

export default DisableBodyScrollingView;
