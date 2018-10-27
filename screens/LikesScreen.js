import React from 'react';

import { UserList } from '../components/UserList';
import NavigationService from '../navigation/NavigationService';

const someUser = {
  name: 'Avocoder',
  source: {
    uri:
      'https://www.telegraph.co.uk/content/dam/news/2016/04/19/avocado_trans_NvBQzQNjv4BqkZdGXfzOPVSbO-9sH583RDp4DftbO29ksMGwKfb1CIU.jpg?imwidth=450',
  },
  title: 'liked 8 posts',
};
export default class LikeScreen extends React.Component {
  static defaultProps = {
    comments: [someUser, someUser, someUser, someUser],
    date: 'August 29',
  };

  openComments = () => {
    NavigationService.navigate('Comments', this.props.comments);
  };
  render() {
    const { comments } = this.props;
    return <UserList style={{ flex: 1 }} data={comments} />;
  }
}
