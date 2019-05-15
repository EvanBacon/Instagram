import { createBrowserApp } from '@react-navigation/web';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';

import MainAppTabNavigator from './MainAppTabNavigator';

const nav = Platform.select({
  web: () => createBrowserApp(MainAppTabNavigator),
  default: () => createAppContainer(MainAppTabNavigator),
});

export default nav();
