import { createStackNavigator } from 'react-navigation';

import CameraScreen from '../screens/CameraScreen';
import CameraSettingsScreen from '../screens/CameraSettingsScreen';
export default createStackNavigator(
  {
    CameraScreen: { screen: CameraScreen, navigationOptions: () => ({ header: null }) },
    CameraSettingsScreen,
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    headerTransitionPreset: 'fade-in-place',
  }
);
