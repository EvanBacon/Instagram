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

const freezeBody = e => {
  if (e.touches.length > 1) e.preventDefault();
};

class DisableBodyScrollingView extends React.Component {
  componentWillUnmount() {
    if (this.view) {
      this.view.removeEventListener('touchstart', freezeBody, false);
      this.view.removeEventListener('touchmove', freezeBody, false);
    }
  }

  render() {
    const { style, ...props } = this.props;

    return (
      <View
        style={[{ flex: 1 }, style]}
        tabIndex="0"
        ref={view => {
          const nextView = getElement(view);
          if (nextView && nextView.addEventListener) {
            nextView.addEventListener('touchstart', freezeBody, false);
            nextView.addEventListener('touchmove', freezeBody, false);
          }
          if (this.view && this.view.removeEventListener) {
            this.view.removeEventListener('touchstart', freezeBody, false);
            this.view.removeEventListener('touchmove', freezeBody, false);
          }
          this.view = nextView;
        }}
        {...props}
      />
    );
  }
}

export default DisableBodyScrollingView;
