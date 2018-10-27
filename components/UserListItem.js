import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';

import ReplyButton from './ReplyButton';
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress = () => {
    this.props.onPress(this.props);
  };
  render() {
    const {
      title,
      hasReply,
      hasLike,
      hasFollowButton,
      isFirst,
      name,
      source,
      date,
      isLiked,

      likes,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          borderBottomColor: 'rgba(0,0,0,0.3)',
          borderBottomWidth: isFirst ? StyleSheet.hairlineWidth : 0,
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 8,
          minHeight: 64,
          marginBottom: 4,
          alignItems: 'stretch',
        }}
      >
        <View>
          <Image
            source={source}
            style={{
              width: 36,
              marginRight: 8,
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
              <Text style={{ fontWeight: '500' }}>{name}</Text> {title}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ opacity: 0.6, marginRight: 12 }}>{date}</Text>
              {hasReply && <ReplyButton />}
            </View>
          </View>

          {hasFollowButton && (
            <View>
              <FollowButton
                isFollowing={this.props.isFollowing}
                onPress={this.props.onPressFollowing}
              />
            </View>
          )}
          {hasLike && (
            <View style={{ flex: 1, maxWidth: 36 }}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  size={16}
                  color={isLiked ? 'red' : 'gray'}
                  name={isLiked ? 'ios-heart' : 'ios-heart-outline'}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const FollowButton = ({ isFollowing, onPress }) => (
  <View
    style={{
      borderColor: '#DBDBDB',
      borderRadius: 4,
      borderWidth: isFollowing ? 1 : 0,
      overflow: 'hidden',
      backgroundColor: isFollowing ? 'white' : '#3C95EC',
    }}
  >
    <TouchableHighlight
      underlayColor={'#DBDBDB'}
      onPress={onPress}
      style={{
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ color: isFollowing ? '#272727' : 'white' }}>
        {isFollowing ? 'Following' : 'Follow'}
      </Text>
    </TouchableHighlight>
  </View>
);
