import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';

import NavigationService from '../navigation/NavigationService';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class CommentsScreen extends React.Component {
  static defaultProps = {
    comments: [
      'this ain it chief',
      'THANSO CAT',
      'people who pretend to be programmers on instagram are lame...',
    ],
    date: 'August 29',
  };

  openComments = () => {
    NavigationService.navigate('Comments', this.props.comments);
  };
  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={(item, index) => `-${index}`}
        renderItem={({ item, index }) => (
          <Comment {...item} isFirst={index === 0} />
        )}
        data={this.props.navigation.state.params.comments}
      />
    );
  }
}

const ReplyButton = ({ style, ...props }) => (
  <Text
    style={[{ color: 'black', fontWeight: 'bold', opacity: 0.6 }, style]}
    {...props}
  >
    Reply
  </Text>
);

const Comment = ({ comment, isFirst, name, source, date, isLiked, likes }) => (
  <View
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
          <Text style={{ fontWeight: '500' }}>{name}</Text> {comment}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ opacity: 0.6, marginRight: 12 }}>{date}</Text>
          <ReplyButton />
        </View>
      </View>

      <View style={{ flex: 1, maxWidth: 36 }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Ionicons
            size={16}
            color={isLiked ? 'red' : 'gray'}
            name={isLiked ? 'ios-heart' : 'ios-heart-outline'}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
