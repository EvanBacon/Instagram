import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import InstaHeaderButton from '../../components/InstaHeaderButton';
import CommentsScreen from '../../screens/CommentsScreen';
import InstaIcon from '../../components/InstaIcon';
import DetailsScreen from '../../screens/DetailsScreen';
import UsersScreen from '../../screens/UsersScreen';
import FollowingTabNavigator from '../FollowingTabNavigator';

const options = {
  cardStyle: { backgroundColor: 'white' },
  headerMode: 'screen',
  defaultNavigationOptions: () => ({
    headerBackImage: () => (
      <InstaIcon name={'chevron-left'} size={30} color={'black'} />
    ),
    headerTintColor: 'black',
    headerStyle: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'rgba(0,0,0,0.098)',
      boxShadow: undefined,
    },
    headerRight: <InstaHeaderButton name={'flip'} />,
    // header: props => <Header {...props} />,
  }),
};

// function createSwitch(routes) {
//   let outputRoutes = {};

//   for (const key of Object.keys(routes)) {
//     const { screen: Comp, navigationOptions } = routes[key];
//     Comp.navigationOptions = navigationOptions;
//     outputRoutes[key] = wrapScreenWithHeader(Comp);
//   }

//   const nav = createSwitchNavigator(outputRoutes, options);
//   nav.path = '';
//   return nav;
// }

function createStack(routes) {
  const nav = createStackNavigator(routes, options);
  nav.path = '';
  return nav;
}

function createAppNavigator(screen, name, navigationOptions) {
  const routes = {
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
    [`${name}_Users`]: {
      screen: UsersScreen,
      navigationOptions: UsersScreen.navigationOptions,
    },
    [`${name}_TV`]: {
      screen: UsersScreen,
      navigationOptions: UsersScreen.navigationOptions,
    },
    [`${name}_Chat`]: {
      screen: UsersScreen,
      navigationOptions: UsersScreen.navigationOptions,
    },
    [`${name}_History`]: {
      screen: UsersScreen,
      navigationOptions: UsersScreen.navigationOptions,
    },
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
  };

  return createStack(routes);
  // return createSwitch(routes);
}

export default createAppNavigator;
