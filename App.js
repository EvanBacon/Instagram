import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Audio } from 'expo-av';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import Stories from './components/Stories/StoriesExperimental';
import MainNavigation from './navigation/MainNavigation';
import NavigationService from './navigation/NavigationService';
import Gate from './rematch/Gate';
import dispatch from './rematch/dispatch';

import * as Permissions from 'expo-permissions';

const Settings = {
  permissions: [Permissions.CAMERA, Permissions.AUDIO_RECORDING],
};
// import Stories from './components/Stories/Stories';
export default class App extends React.Component {
  componentDidMount() {
    for (const permission of Settings.permissions) {
      dispatch().permissions.getAsync({ permission });
    }
  }
  render() {
    return (
      <Gate>
        <ActionSheetProvider>
          <AudioMode>
            <ConnectedInnerApp>
              <MainNavigation
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </ConnectedInnerApp>
          </AudioMode>
        </ActionSheetProvider>
      </Gate>
    );
  }
}

class AudioMode extends React.PureComponent {
  _applyMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        // ...this.state.modeToSet,
        playThroughEarpieceAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        // iOS values don't matter, this is Android-only selector
        allowsRecordingIOS: false,
        playsInSilentModeIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      });
      // this.setState({ setMode: this.state.modeToSet });
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    return this.props.children;
  }
}

class InnerApp extends React.Component {
  render() {
    const { offset, children, carouselOpen } = this.props;
    return (
      <React.Fragment>
        {children}
        <View
          style={[
            { overflow: 'hidden', ...StyleSheet.absoluteFillObject },
            // offset,
            carouselOpen ? { display: 'flex' } : { display: 'none' },
          ]}
        >
          <Stories />
        </View>
      </React.Fragment>
    );
  }
}

const ConnectedInnerApp = connect(({ stories }) => ({
  ...stories,
}))(InnerApp);
