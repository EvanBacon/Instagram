import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import InstaIcon from '../components/InstaIcon';

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

const DrawerNavigator = createDrawerNavigator(
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

DrawerNavigator.path = '';
export default DrawerNavigator;
