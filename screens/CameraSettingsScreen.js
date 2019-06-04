import React from 'react';
import { View } from 'react-native';

import InstaIcon from '../components/InstaIcon';

export default class CameraSettingsScreen extends React.Component {
  static navigationOptions = navigation => ({
    title: 'Story Controls',
    renderLeft: () => (
      <InstaIcon
        name="cancel"
        color="black"
        onPress={() => navigation.goBack()}
      />
    ),
  });
  render() {
    return <View />;
  }
}
