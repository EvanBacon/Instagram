import MainAppTabNavigator from './MainAppTabNavigator';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { createBrowserApp } from '@react-navigation/web';

const createApp = Platform.select({
  web: routes => createBrowserApp(routes, { history: 'hash' }),
  default: routes => createAppContainer(routes),
});
export default createApp(MainAppTabNavigator);
