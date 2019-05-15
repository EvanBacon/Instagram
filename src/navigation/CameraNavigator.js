import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Camera from '../screens/CameraScreen';
import CameraSettings from '../screens/CameraSettingsScreen';

Camera.path = '';
CameraSettings.path = 'settings';

export default createSwitchNavigator(
  {
    Camera,
    CameraSettings,
  },
  {
    backBehavior: 'order',
    mode: 'modal',
    headerMode: 'screen',
    headerTransitionPreset: 'fade-in-place',
  },
);
