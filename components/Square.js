import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default class Square extends React.Component {
  state = { isLoaded: false };

  render() {
    return <View {...this.props} style={this.getStyle()} onLayout={this.resize} />;
  }

  resize = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    this.setState({ width, height, isLoaded: true });
  };

  getStyle = () => {
    const inputStyle = StyleSheet.flatten(this.props.style) || {};
    const { aspectRatio = 1 } = inputStyle;
    const style = [inputStyle, { aspectRatio }];

    if (this.state.isLoaded) {
      const { width = 0, height = 0 } = this.state;
      if (width === 0) {
        style.push({ width: height * aspectRatio, height });
      } else {
        style.push({ width, height: width * aspectRatio });
      }
    }
    return style;
  };
}
