import React from 'react';
import { Linking, Text, View } from 'react-native';

export default class ProfileBody extends React.Component {
  render() {
    return (
      <View
        style={{
          paddingHorizontal: 12,
        }}>
        <Text style={{ fontSize: 16, marginBottom: 4, fontWeight: '500' }}>Evan Bacon</Text>
        <Text style={{ fontSize: 16 }}>
          Self-taught #JavaScript developer 🎨 #Lego Master Builder I do stuff with 💙 Expo,
          #ReactNative, firebase, arkit, and #3dmodeling 🏠 #Austin 🔥 Bay Area
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#003569',
            marginBottom: 4,
            fontWeight: '500',
          }}
          onPress={() => Linking.openURL('https://www.github.com/evanbacon')}>
          github.com/evanbacon
        </Text>
      </View>
    );
  }
}
