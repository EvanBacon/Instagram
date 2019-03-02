import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Item } from '../components/Item';

export default class HomeScreen extends React.Component {
  static defaultProps = {
    item: {
      key: 'item-a',
      description: 'New selfie, might take it down, idk, give me likes',
      author: '@baconbrix',
      image:
        'https://resize-parismatch.ladmedia.fr/r/940,628/l/logo/img/var/news/storage/images/paris-match/actu/economie/elon-musk-force-de-demissionner-du-poste-de-president-du-ca-de-tesla-1577422/25590649-1-fre-FR/Elon-Musk-force-de-demissionner-du-poste-de-president-du-CA-de-Tesla.jpg',
    },
  };
  render() {
    const { state = {} } = this.props.navigation;
    const { item } = state.params;
    return (
      <View style={styles.container}>
        <Item comments={COMMENTS} {...item} />
      </View>
    );
  }
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

const COMMENTS = [
  {
    name: 'Avocoder',
    source: {
      uri:
        'https://www.telegraph.co.uk/content/dam/news/2016/04/19/avocado_trans_NvBQzQNjv4BqkZdGXfzOPVSbO-9sH583RDp4DftbO29ksMGwKfb1CIU.jpg?imwidth=450',
    },
    isLiked: true,
    date: '2w',
    title: 'Aint it chief',
  },
  {
    name: 'fake hacker',
    source: {
      uri: 'https://www.teachprivacy.com/wp-content/uploads/Hacker1.jpg',
    },
    isLiked: false,
    date: '2w',
    title:
      'Chief called, he said this aint it,  this aint it, this aint it, this aint it, this aint it,',
  },
  {
    name: 'lemon grab',
    source: {
      uri:
        'http://theculturalgutter.com/wp-content/uploads/2013/10/lemongrab-candy-life.png',
    },
    isLiked: true,
    date: '3w',
    title: 'hello officer, this post right here...',
  },
].map(item => ({ ...item, hasLike: true, hasReply: true }));
