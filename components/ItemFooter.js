import React from 'react';
import { Text, View } from 'react-native';

import NavigationService from '../navigation/NavigationService';
import IconBar from './IconBar';

export default class ItemFooter extends React.Component {
  get item() {
    return {
      date: 'April 2',
      ...this.props.item,
    };
  }
  openComments = () => {
    NavigationService.navigate('Profile_Comments', {
      item: this.item,
    });
  };
  render() {
    const { account, description, date, comments } = this.item;
    return (
      <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
        <IconBar />
        <Text style={{ marginTop: 6 }}>
          <Text style={{ fontWeight: '600', color: '#262626', fontSize: 14 }}>{account}</Text>{' '}
          {description}
        </Text>
        {comments && comments.length && (
          <Text
            onPress={this.openComments}
            style={{ paddingVertical: 8, fontSize: 14, opacity: 0.6 }}>
            View all {comments.length} comments
          </Text>
        )}
        <Text style={{ fontSize: 10, color: '#999' }}>{date.toUpperCase()}</Text>
      </View>
    );
  }
}
