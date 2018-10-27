import React from 'react';
import { FlatList, Text } from 'react-native';

import Comment from '../components/UserListItem';
import NavigationService from '../navigation/NavigationService';

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
