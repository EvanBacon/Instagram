import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ExploreScreen from '../screens/ExploreScreen';
import FeedScreen from '../screens/FeedScreen';
import MediaScreen from '../screens/MediaScreen';
import ProfileScreen from '../screens/ProfileScreen';
import createAppNavigator from './createAppNavigator';
import LikesTabNavigator from './LikesTabNavigator';

MediaScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="add-circle" />
  ),
};

const FeedNav = createAppNavigator(FeedScreen, 'Feed');
FeedNav.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'home'} />,
};

const ExploreNav = createAppNavigator(ExploreScreen, 'Explore');
ExploreNav.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search" />,
};
const ProfileNav = createAppNavigator(ProfileScreen, 'Profile');
ProfileNav.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="person" />,
};

const LikesNav = createAppNavigator(LikesTabNavigator, 'Likes');
LikesNav.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={focused ? 'favorite' : 'favorite-border'}
    />
  ),
};

export default createBottomTabNavigator(
  {
    Feed: FeedNav,
    Explore: ExploreNav,
    Media: { screen: MediaScreen, navigationOptions: { header: null } },
    Likes: LikesNav,
    Profile: ProfileNav,
  },
  {
    initialRouteName: 'Explore',
    tabBarOptions: {
      showLabel: false,
    },
  },
);
