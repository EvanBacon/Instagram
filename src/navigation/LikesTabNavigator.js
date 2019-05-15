import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';

import LikesFollowing from '../screens/LikesScreen';

const LikesTabNavigator = createMaterialTopTabNavigator(
  {
    LikesFollowing: LikesFollowing,
    LikesYou: { screen: LikesFollowing, navigationOptions: { title: 'You' } },
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
