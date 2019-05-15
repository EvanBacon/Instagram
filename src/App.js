import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Audio } from 'expo';
import Stories from './components/Stories/Stories';
import MainNavigation from './navigation/MainNavigation';
import NavigationService from './navigation/NavigationService';
import Gate from './rematch/Gate';

export default class App extends React.Component {
  render() {
    return (
      <Gate>
        <ActionSheetProvider>
          <ConnectedInnerApp />
        </ActionSheetProvider>
      </Gate>
    );
  }
}
class InnerApp extends React.Component {
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
    const { offset, carouselOpen } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <MainNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        <View
          style={[
            { overflow: 'hidden', ...StyleSheet.absoluteFillObject },
            // offset,
            carouselOpen ? { display: 'flex' } : { display: 'none' },
          ]}>
          <Stories />
        </View>
      </View>
    );
  }
}

const ConnectedInnerApp = connect(({ stories }) => ({ ...stories }))(InnerApp);
