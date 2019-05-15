import React from 'react';
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native';

const color = '#DBDBDB';
export default class FollowButton extends React.Component {
  render() {
    const { isFollowing, onPress } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            borderWidth: isFollowing ? 1 : 0,
            backgroundColor: isFollowing ? 'white' : '#3C95EC',
          },
        ]}>
        <TouchableHighlight underlayColor={color} onPress={onPress} style={styles.touchable}>
          <Text style={{ color: isFollowing ? '#272727' : 'white' }}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    borderColor: color,
  },
  touchable: {
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
});
