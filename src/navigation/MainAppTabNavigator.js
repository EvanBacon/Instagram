import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import initialScreens from '../constants/initialScreens';
import CameraNavigator from './CameraNavigator';
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
