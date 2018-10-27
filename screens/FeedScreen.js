import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import FeedList from '../components/FeedList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <FeedList
          style={{ flex: 1 }}
          data={[
            {
              key: 'item-a',
              description: 'New selfie, might take it down, idk, give me likes',
              author: '@baconbrix',
              source: {
                uri:
                  'https://resize-parismatch.ladmedia.fr/r/940,628/l/logo/img/var/news/storage/images/paris-match/actu/economie/elon-musk-force-de-demissionner-du-poste-de-president-du-ca-de-tesla-1577422/25590649-1-fre-FR/Elon-Musk-force-de-demissionner-du-poste-de-president-du-CA-de-Tesla.jpg',
              },
            },
            {
              key: 'item-b',
              description: 'New selfie, might take it down, idk, give me likes',
              author: '@baconbrix',
              source: {
                uri:
                  'https://media.novinky.cz/511/695110-top_foto1-5ir4w.jpg?1537214402',
              },
            },
            {
              key: 'item-c',
              description: 'New selfie, might take it down, idk, give me likes',
              author: '@baconbrix',
              source: {
                uri:
                  'https://resize-parismatch.ladmedia.fr/r/940,628/l/logo/img/var/news/storage/images/paris-match/actu/economie/elon-musk-force-de-demissionner-du-poste-de-president-du-ca-de-tesla-1577422/25590649-1-fre-FR/Elon-Musk-force-de-demissionner-du-poste-de-president-du-CA-de-Tesla.jpg',
              },
            },
            {
              key: 'item-d',
              description: 'New selfie, might take it down, idk, give me likes',
              author: '@baconbrix',
              source: {
                uri:
                  'https://cdn2.i-scmp.com/sites/default/files/styles/landscape/public/images/methode/2018/04/20/c0d961b2-43b0-11e8-ab09-36e8e67fb996_1280x720_125123.JPG?itok=SYeH_4My',
              },
            },
            {
              key: 'item-e',
              description: 'New selfie, might take it down, idk, give me likes',
              author: '@baconbrix',
              source: {
                uri:
                  'https://resize-parismatch.ladmedia.fr/r/940,628/l/logo/img/var/news/storage/images/paris-match/actu/economie/elon-musk-force-de-demissionner-du-poste-de-president-du-ca-de-tesla-1577422/25590649-1-fre-FR/Elon-Musk-force-de-demissionner-du-poste-de-president-du-CA-de-Tesla.jpg',
              },
            },
          ]}
        />
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode',
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes',
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
