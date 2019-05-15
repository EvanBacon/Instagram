import React from 'react';
import { createStackNavigator } from 'react-navigation';

import InstaHeaderButton from '../components/InstaHeaderButton';
import InstaIcon from '../components/InstaIcon';
import CommentsScreen from '../screens/CommentsScreen';
import DetailsScreen from '../screens/DetailsScreen';
import UsersScreen from '../screens/UsersScreen';
import FollowingTabNavigator from './FollowingTabNavigator';

function createAppNavigator(screen, name, navigationOptions) {
  const nav = createStackNavigator(
    {
      [name]: { screen, navigationOptions },
      // Media: { screen: MediaScreen, navigationOptions: { header: null } },
      [`${name}_Followers`]: {
        screen: UsersScreen,
        navigationOptions: { title: 'Followers' },
      },
      [`${name}_Following`]: {
        screen: FollowingTabNavigator,
        navigationOptions: { title: 'Following' },
      },
      [`${name}_Users`]: UsersScreen,
      [`${name}_TV`]: UsersScreen,
      [`${name}_Chat`]: UsersScreen,
      [`${name}_History`]: UsersScreen,
      [`${name}_Details`]: {
        screen: DetailsScreen,
        navigationOptions: {
          title: 'Photo',
          headerRight: <InstaHeaderButton name={'flip'} />,
        },
      },
      [`${name}_Comments`]: {
        screen: CommentsScreen,
        navigationOptions: {
          title: 'Comments',
          headerRight: <InstaHeaderButton name={'send'} />,
        },
      },
    },
    {
      cardStyle: { backgroundColor: 'white' },
      defaultNavigationOptions: () => ({
        headerBackImage: () => (
          <InstaIcon name={'chevron-left'} size={30} color={'black'} />
        ),
        headerTintColor: 'black',
        headerStyle: {
          borderBottomWidth: 0.5,
          borderBottomColor: 'rgba(0,0,0,0.098)',
        },
        headerRight: <InstaHeaderButton name={'flip'} />,
        // header: props => <Header {...props} />,
      }),
    },
  );
  nav.path = '';
  return nav;
}

export default createAppNavigator;
