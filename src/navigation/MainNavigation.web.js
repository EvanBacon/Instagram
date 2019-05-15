// import { createBrowserApp } from '@react-navigation/web';
// import MainAppTabNavigator from './MainAppTabNavigator';
// export default createBrowserApp(MainAppTabNavigator);
import { createAppContainer } from 'react-navigation';
import MainAppTabNavigator from './MainAppTabNavigator';
export default createAppContainer(MainAppTabNavigator);
