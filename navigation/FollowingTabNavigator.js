import { createBottomTabNavigator } from 'react-navigation-tabs';

import UsersScreen from '../screens/UsersScreen';

const FollowingTabNavigator = createBottomTabNavigator(
  {
    People: UsersScreen,
    Hashtags: UsersScreen,
  },
  {
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
export default FollowingTabNavigator;
