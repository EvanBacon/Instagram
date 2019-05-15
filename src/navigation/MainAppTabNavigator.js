import React from 'react';
import { View } from 'react-native';
import {
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import initialScreens from '../constants/initialScreens';
import MainUITabNavigator from './MainUITabNavigator';
import CameraNavigator from './CameraNavigator';

CameraNavigator.path = 'camera';
MainUITabNavigator.path = '';

export default createSwitchNavigator(
  {
    MediaCreation: CameraNavigator,
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
  },
);
