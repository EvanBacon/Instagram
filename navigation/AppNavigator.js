import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import DetailsScreen from '../screens/DetailsScreen';
import MainTabNavigator from './MainTabNavigator';
import CommentsScreen from '../screens/CommentsScreen';
import MediaScreen from '../screens/MediaScreen';

const StackNav = createStackNavigator(
  {
    // Media: { screen: MediaScreen, navigationOptions: { header: null } },

    Main: {
      screen: MainTabNavigator,
      navigationOptions: { title: 'Instaham' },
    },
    Details: { screen: DetailsScreen, navigationOptions: { title: 'Photo' } },
    Comments: {
      screen: CommentsScreen,
      navigationOptions: { title: 'Comments' },
    },
  },
  {
    cardStyle: { backgroundColor: 'white' },
    navigationOptions: {
      headerTintColor: 'black',
    },
  },
);

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: StackNav,
});
