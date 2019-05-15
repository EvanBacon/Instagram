import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FollowButton from './FollowButton';
import LikeButton from './LikeButton';
import ProfileImage from './ProfileImage';
import ReplyButton from './ReplyButton';

export default class UserListItem extends React.Component {
  static defaultProps = {
    item: {},
  };
  onPress = () => {
    this.props.onPress(this.props.item);
  };

  renderLikeButton = () => {
    const { hasLike, isLiked } = this.props.item;
    if (hasLike) {
      return (
        <View style={{ flex: 1, maxWidth: 36 }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LikeButton size={16} active={isLiked} color="gray" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderFollowButton = () => {
    const { hasFollowButton, isFollowing } = this.props.item;
    const { onPressFollowing } = this.props;

    if (hasFollowButton) {
      return (
        <View>
          <FollowButton isFollowing={isFollowing} onPress={onPressFollowing} />
        </View>
      );
    }
  };
  render() {
    const { title, hasReply, isFirst, account, date } = this.props.item;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          borderBottomWidth: isFirst ? StyleSheet.hairlineWidth : 0,
          borderBottomColor: 'rgba(0,0,0,0.3)',
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 8,
          minHeight: 64,
          marginBottom: 4,
          alignItems: 'stretch',
        }}
      >
        <View>
          <ProfileImage
            account={account}
            style={{
              width: 36,
              height: 36,
              marginRight: 8,
              resizeMode: 'cover',
              aspectRatio: 1,
              borderRadius: 36 / 2,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ flexWrap: 'wrap' }}>
              <Text style={{ fontWeight: '500' }}>{account}</Text> {title}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ opacity: 0.6, marginRight: 12 }}>{date}</Text>
              {hasReply && <ReplyButton />}
            </View>
          </View>

          {this.renderFollowButton()}
          {this.renderLikeButton()}
        </View>
      </TouchableOpacity>
    );
  }
}
