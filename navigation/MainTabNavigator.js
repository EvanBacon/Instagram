import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import InstaHeaderButton from '../components/InstaHeaderButton';
import TabBarIcon from '../components/TabBarIcon';
import initialScreens from '../constants/initialScreens';
import EditMedia from '../screens/EditMediaScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FeedScreen from '../screens/FeedScreen';
import MediaScreen from '../screens/MediaScreen';
import createAppNavigator from './utils/createAppNavigator';
import ProfileScreen from '../screens/ProfileScreen';
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
        disabled
        touchableStyle={{ marginHorizontal: 0 }}
        onPress={() => {
          // NavigationService.navigate('Feed_TV');
        }}
      />
      <InstaHeaderButton
        name={'send'}
        disabled
        onPress={() => {
          // NavigationService.navigate('Feed_Chat');
        }}
      />
    </View>
  ),
});
FeedNav.path = '';
FeedNav.navigationOptions = {
  tabBarIcon: createTabBarIcon('home'),
};

const ProfileNav = createAppNavigator(
  ProfileScreen,
  'Profile',
  navigationOptions => ({
    headerLeft: (
      <InstaHeaderButton
        disabled
        name={'history'}
        onPress={() => {
          // NavigationService.navigate('Profile_History');
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
ProfileNav.path = '';
ProfileNav.navigationOptions = {
  tabBarIcon: createTabBarIcon('profile'),
};

function createTabBarIcon(name) {
  return ({ focused }) => <TabBarIcon focused={focused} name={name} />;
}

const Media = createStackNavigator(
  {
    MediaScreen,
    EditMedia,
  },
  {
    // initialRouteName: 'EditMedia',
  },
);
Media.path = '';
Media.navigationOptions = {
  tabBarIcon: createTabBarIcon('capture'),
};
const MainTabNavigator = createBottomTabNavigator(
  {
    Feed: FeedNav,
    // Explore: {
    //   screen: createAppNavigator(ExploreScreen, 'Explore'),
    //   navigationOptions: {
    //     tabBarIcon: createTabBarIcon('search'),
    //   },
    // },
    Media: Media,

    // Likes: {
    //   screen: createAppNavigator(LikesTabNavigator, 'Likes', {
    //     header: null,
    //   }),
    //   navigationOptions: {
    //     tabBarIcon: createTabBarIcon('like'),
    //     header: null,
    //   },
    // },
    Profile: ProfileNav,
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
