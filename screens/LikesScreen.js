import React from 'react';

import { UserList } from '../components/UserList';

const someUser = {
  account: 'notbrent',
  source: {
    uri:
      'https://i.cspa.io/user_1092/89c808b0-24f0-4be3-94d4-b2b7af2ca987/400x.png',
  },
  title: 'liked 8 posts',
};
export default class LikeScreen extends React.Component {
  static navigationOptions = { title: 'Following' };

  static defaultProps = {
    comments: [someUser, someUser, someUser, someUser],
    date: 'August 29',
  };

  render() {
    const { comments } = this.props;
    return <UserList style={{ flex: 1 }} data={comments} />;
  }
}
