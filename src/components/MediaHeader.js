import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

class Header extends React.Component {
  render() {
    const { style, ...props } = this.props;

    return (
      <View
        style={StyleSheet.flatten([
          {
            position: 'absolute',
            top: Constants.statusBarHeight || 16,
            left: 0,
            right: 0,
            flexDirection: 'row',
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          },
          style,
        ])}
        {...props}
      />
    );
  }
}

export default Header;
