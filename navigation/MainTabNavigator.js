import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MediaScreen from '../screens/MediaScreen';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';

MediaScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='add-circle'
    />
  ),
};

FeedScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"home"}
    />
  ),
};

ProfileScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="person"
    />
  ),
};

export default createBottomTabNavigator({
  Feed: FeedScreen,
  Media: MediaScreen,
  Profile: ProfileScreen,
}, {
  tabBarOptions: {
    showLabel: false,
  }
});
