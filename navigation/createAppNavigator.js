import React from 'react';
import { createStackNavigator } from 'react-navigation';

import CommentsScreen from '../screens/CommentsScreen';
import DetailsScreen from '../screens/DetailsScreen';
import UsersScreen from '../screens/UsersScreen';
import FollowingTabNavigator from './FollowingTabNavigator';

function createAppNavigator(screen, name) {
  return createStackNavigator(
    {
      [name]: screen,
      // Media: { screen: MediaScreen, navigationOptions: { header: null } },
      [`${name}_Followers`]: {
        screen: UsersScreen,
        navigationOptions: { title: 'Followers' },
      },
      [`${name}_Following`]: {
        screen: FollowingTabNavigator,
        navigationOptions: { title: 'Following' },
      },
      [`${name}_Users`]: UsersScreen,
      [`${name}_Details`]: {
        screen: DetailsScreen,
        navigationOptions: { title: 'Photo' },
      },
      [`${name}_Comments`]: {
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
}

export default createAppNavigator;
