import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const StackNav = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
    navigationOptions: { title: 'Instaham 🐷' },
  },
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: StackNav,
});
