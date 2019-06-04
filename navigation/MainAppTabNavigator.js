import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import CameraNavigator from './CameraNavigator';
import initialScreens from '../constants/initialScreens';
import DrawerNavigator from './DrawerNavigator';

export default createSwitchNavigator(
  {
    MediaCreation: CameraNavigator,
    SocialUI: DrawerNavigator,
  },
  {
    initialRouteName: initialScreens.app,
  },
);
