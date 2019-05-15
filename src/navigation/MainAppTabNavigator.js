import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import MainUITabNavigator from './MainUITabNavigator';
import MediaCreationNavigator from './MediaCreationNavigator';
import initialScreens from '../constants/initialScreens';

export default createBottomTabNavigator(
  {
    MediaCreation: MediaCreationNavigator,
    SocialUI: MainUITabNavigator,
  },
  {
    initialRouteName: initialScreens.app,
    tabBarComponent: () => <View />,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false,
    },
  }
);
