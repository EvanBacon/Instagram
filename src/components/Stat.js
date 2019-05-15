import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Stat extends React.Component {
  render() {
    const { title, children, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.value}>{children}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: { justifyContent: 'center', alignItems: 'center' },
  value: { fontSize: 20 },
  title: { fontSize: 16, opacity: 0.8 },
});
