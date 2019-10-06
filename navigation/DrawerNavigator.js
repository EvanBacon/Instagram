import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  DrawerNavigatorItems,
  createDrawerNavigator,
} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import InstaIcon from '../components/InstaIcon';
import NavigationService from './NavigationService';
import InstaHeaderButton from '../components/InstaHeaderButton';

const CustomDrawerContentComponent = ({ items, ...props }) => {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerHeader>Baconbrix</DrawerHeader>
      <ScrollView>
        <DrawerNavigatorItems
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

const createDrawerScreen = (screen, name, icon, url) => {
  screen.navigationOptions = {
    title: name,
  };
  screen.path = '';

  const stackScreen = createStackNavigator(
    {
      screen,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        headerTintColor: 'black',
        headerStyle: {
          borderBottomWidth: 0.5,
          borderBottomColor: 'rgba(0,0,0,0.098)',
          boxShadow: undefined,
        },
        headerLeft: (
          <InstaHeaderButton
            name={'chevron-left'}
            onPress={() => {
              NavigationService.goBack();
            }}
          />
        ),
        headerRight: (
          <InstaHeaderButton
            name={'menu'}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }),
    },
  );

  stackScreen.path = url;
  stackScreen.navigationOptions = createDrawerOptions(name, icon);

  return stackScreen;
};

const DrawerNavigator = createDrawerNavigator(
  {
    MainTabUI: MainTabNavigator,
    Activity: createDrawerScreen(
      () => <View />,
      'Activity',
      'history',
      'activity',
    ),
    Nametag: createDrawerScreen(() => <View />, 'Nametag', 'scan', 'nametag'),
    Saved: createDrawerScreen(() => <View />, 'Saved', 'bookmark', 'saved'),
    CloseFriends: createDrawerScreen(
      () => <View />,
      'Close Friends',
      'likes',
      'closefriends',
    ),
    DiscoverPeople: createDrawerScreen(
      () => <View />,
      'Discover People',
      'add-user',
      'discoverpeople',
    ),
    OpenFacebook: createDrawerScreen(
      () => <View />,
      'Open Facebook',
      'facebook',
      'openfacebook',
    ),
  },
  {
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: 'right',
    drawerType: 'slide',
  },
);

DrawerNavigator.path = '';
export default DrawerNavigator;
