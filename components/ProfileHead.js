import React from 'react';
import { View, StyleSheet } from 'react-native';

import Posts from '../constants/Posts';
import NavigationService from '../navigation/NavigationService';
import { ACCOUNT, OutlineImage } from '../screens/ProfileScreen';
import EditProfileButton from './EditProfileButton';
import StatsBar from './StatsBar';

export default class ProfileHead extends React.Component {
  render() {
    const stats = [
      {
        title: 'posts',
        value: Posts.length,
        onPress: () => {
          //TODO: Bacon: Scroll down
        },
      },
      {
        title: 'following',
        value: '2k',
        onPress: () => NavigationService.navigate('Profile_Following', { users: [] }),
      },
      {
        title: 'followers',
        value: '662',
        onPress: () => NavigationService.navigate('Profile_Followers', { users: [] }),
      },
    ];
    return (
      <View style={styles.container}>
        <OutlineImage account={ACCOUNT} imageSize={96} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
          <StatsBar stats={stats} />
          <EditProfileButton />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
});
