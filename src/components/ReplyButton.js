import React from 'react';
import { Text } from 'react-native';

export default class ReplyButton extends React.Component {
  render() {
    const { style, ...props } = this.props;

    return (
      <Text
        style={[{ color: 'black', fontWeight: 'bold', opacity: 0.6 }, style]}
        {...props}
      >
        Reply
      </Text>
    );
  }
}
