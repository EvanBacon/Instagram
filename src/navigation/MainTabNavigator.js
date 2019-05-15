import React from 'react';
import { View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import InstaHeaderButton from '../components/InstaHeaderButton';
import TabBarIcon from '../components/TabBarIcon';
import initialScreens from '../constants/initialScreens';
import EditMedia from '../screens/EditMediaScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FeedScreen from '../screens/FeedScreen';
import MediaScreen from '../screens/MediaScreen';
import ProfileScreen from '../screens/ProfileScreen';
import createAppNavigator from './utils/createAppNavigator';
import LikesTabNavigator from './LikesTabNavigator';
import NavigationService from './NavigationService';

const FeedNav = createAppNavigator(FeedScreen, 'Feed', {
  headerLeft: (
    <InstaHeaderButton
      name={'camera'}
      onPress={() => {
        NavigationService.navigate('MediaCreation');
      }}
    />
  ),
  headerRight: (
    <View style={{ flexDirection: 'row' }}>
      <InstaHeaderButton
        name={'tv'}
        touchableStyle={{ marginHorizontal: 0 }}
        onPress={() => {
          NavigationService.navigate('Feed_TV');
        }}
      />
      <InstaHeaderButton
        name={'send'}
        onPress={() => {
          NavigationService.navigate('Feed_Chat');
        }}
      />
    </View>
  ),
});

const ProfileNav = createAppNavigator(
  ProfileScreen,
  'Profile',
  navigationOptions => ({
    headerLeft: (
      <InstaHeaderButton
        name={'history'}
        onPress={() => {
          NavigationService.navigate('Profile_History');
        }}
      />
    ),
    headerRight: (
      <InstaHeaderButton
        name={'menu'}
        onPress={() => {
          navigationOptions.navigation.openDrawer();
        }}
      />
    ),
  }),
);

function createTabBarIcon(name) {
  return ({ focused }) => <TabBarIcon focused={focused} name={name} />;
}

const MainTabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedNav,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('home'),
      },
    },
    Explore: {
      screen: createAppNavigator(ExploreScreen, 'Explore'),
      navigationOptions: {
        tabBarIcon: createTabBarIcon('search'),
      },
    },
    Media: {
      screen: createStackNavigator(
        {
          MediaScreen,
          EditMedia,
        },
        {
          // initialRouteName: 'EditMedia',
        },
      ),
      navigationOptions: {
        tabBarIcon: createTabBarIcon('capture'),
      },
    },
    Likes: {
      screen: createAppNavigator(LikesTabNavigator, 'Likes', {
        header: null,
      }),
      navigationOptions: {
        tabBarIcon: createTabBarIcon('like'),
        header: null,
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('profile'),
      },
    },
  },
  {
    initialRouteName: initialScreens.UI,
    tabBarOptions: {
      showLabel: false,
    },
  },
);
MainTabNavigator.path = '';

export default MainTabNavigator;
// export default FeedNav;
