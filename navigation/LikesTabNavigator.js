import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';

import LikesScreen from '../screens/LikesScreen';

const LikesTabNavigator = createMaterialTopTabNavigator(
  {
    LikesFollowing: {
      screen: LikesScreen,
      navigationOptions: { title: 'Following' },
    },
    LikesYou: { screen: LikesScreen, navigationOptions: { title: 'You' } },
  },
  {
    header: null,
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        backgroundColor: 'black',
      },
      upperCaseLabel: false,
      labelStyle: {
        fontWeight: '500',
        fontSize: 18,
      },
      style: {
        backgroundColor: 'white',
      },
    },
  },
);
export default LikesTabNavigator;
