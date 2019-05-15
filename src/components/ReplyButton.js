import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default class ReplyButton extends React.Component {
  render() {
    const { style, ...props } = this.props;

    return (
      <Text style={[styles.container, style]} {...props}>
        Reply
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: { color: 'black', fontWeight: 'bold', opacity: 0.6 },
});
