import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';

import InstaHeaderButton from '../components/InstaHeaderButton';
import InstaIcon from '../components/InstaIcon';
import TabBarIcon from '../components/TabBarIcon';
import initialScreens from '../constants/initialScreens';
import EditMediaScreen from '../screens/EditMediaScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FeedScreen from '../screens/FeedScreen';
import MediaScreen from '../screens/MediaScreen';
import ProfileScreen from '../screens/ProfileScreen';
import createAppNavigator from './createAppNavigator';
import LikesTabNavigator from './LikesTabNavigator';
import NavigationService from './NavigationService';

const mediaStack = createStackNavigator(
  {
    MediaScreen: {
      screen: MediaScreen,
      navigationOptions: ({ navigation }) => {
        // const goToAlbums = () => navigation.navigate('MediaAlbums');
        // const clearAlbumSelection = () => navigation.pop(2);
        // const { params } = navigation.state;
        // const isAlbumSet = params && params.album;

        return {
          title: 'Camera Roll',
          headerRight: (
            <View style={{ marginRight: 5 }}>
              <Button
                title="Next"
                onPress={() => {
                  navigation.navigate('EditMedia');
                }}
              />
            </View>
          ),
        };
      },
    },
    EditMedia: {
      screen: EditMediaScreen,
    },
  },
  {
    initialRouteName: 'EditMedia',
  },
);
mediaStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="capture" />,
};

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
FeedNav.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
};

const ExploreNav = createAppNavigator(ExploreScreen, 'Explore');
ExploreNav.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search" />,
};

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
ProfileNav.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="profile" />,
};

const LikesNav = createAppNavigator(LikesTabNavigator, 'Likes', {
  header: null,
});

LikesNav.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="like" />,
  header: null,
};

const MainTabNavigator = createBottomTabNavigator(
  {
    Feed: FeedNav,
    // Explore: ExploreNav,
    Media: mediaStack,
    // Likes: LikesNav,
    Profile: ProfileNav,
  },
  {
    initialRouteName: initialScreens.UI,
    tabBarOptions: {
      showLabel: false,
    },
  },
);

const CustomDrawerContentComponent = ({ items, ...props }) => {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerHeader>Baconbrix</DrawerHeader>
      <ScrollView>
        <DrawerItems
          labelStyle={{ marginHorizontal: 0, fontWeight: 'normal' }}
          iconContainerStyle={{ marginHorizontal: 8 }}
          {...props}
          items={items.slice(1)}
        />
      </ScrollView>
      <DrawerFooter />
    </SafeAreaView>
  );
};

const DrawerHeader = ({ children }) => {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        borderBottomColor: 'rgba(0,0,0,0.095)',
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 16, marginVertical: 18, marginLeft: 8 }}>
        {children}
      </Text>
    </View>
  );
};

const DrawerFooter = () => {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        borderTopColor: 'rgba(0,0,0,0.095)',
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
      }}
    >
      {createDrawerIcon('settings')}
      <Text style={{ fontSize: 16, marginVertical: 16, marginLeft: 8 }}>
        Settings
      </Text>
    </View>
  );
};

const createDrawerIcon = name => (
  <InstaIcon name={name} color={'black'} size={24} />
);

const createDrawerOptions = (name, icon) => ({
  drawerIcon: createDrawerIcon(icon),
  drawerLabel: name,
});

const createDrawerScreen = (screen, name, icon) => ({
  screen,
  navigationOptions: createDrawerOptions(name, icon),
});

MainTabNavigator.path = '';
export default createDrawerNavigator(
  {
    MainTabUI: MainTabNavigator,
    Activity: createDrawerScreen(View, 'Activity', 'history'),
    Nametag: createDrawerScreen(View, 'Nametag', 'scan'),
    Saved: createDrawerScreen(View, 'Saved', 'bookmark'),
    CloseFriends: createDrawerScreen(View, 'Close Friends', 'likes'),
    DiscoverPeople: createDrawerScreen(View, 'Discover People', 'add-user'),
    OpenFacebook: createDrawerScreen(View, 'Open Facebook', 'facebook'),
  },
  {
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: 'right',
    drawerType: 'slide',
  },
);
