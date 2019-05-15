import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
export default class Stat extends React.Component {
  render() {
    const { title, children, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>{children}</Text>
          <Text style={{ fontSize: 16, opacity: 0.8 }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
