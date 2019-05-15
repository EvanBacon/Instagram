import React from 'react';
import { FlatList } from 'react-native';

import UserListItem from './UserListItem';

export class UserList extends React.Component {
  render() {
    const { style, onPress, ...props } = this.props;
    return (
      <FlatList
        style={style}
        keyExtractor={(item, index) => `-${index}`}
        renderItem={({ item, index }) => (
          <UserListItem item={item} index={index} onPress={onPress} />
        )}
        {...props}
      />
    );
  }
}
