import React from 'react';
import { FlatList } from 'react-native';

import Comment from '../components/UserListItem';

export default class CommentsScreen extends React.Component {
  render() {
    const item = this.props.navigation.getParam('item');

    return (
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={(item, index) => `-${index}`}
        renderItem={({ item, index }) => <Comment item={item} isFirst={index === 0} />}
        data={item.comments}
      />
    );
  }
}
