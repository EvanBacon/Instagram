import React from 'react';

import { UserList } from '../components/UserList';
import NavigationService from '../navigation/NavigationService';
import { SearchBar } from 'react-native-elements';
import { View } from 'react-native';
const someUser = {
  name: 'lol anyone else',
  hasFollowButton: true,
  isFollowing: true,
  onPressFollowing: () => {},
  source: {
    uri:
      'https://www.telegraph.co.uk/content/dam/news/2016/04/19/avocado_trans_NvBQzQNjv4BqkZdGXfzOPVSbO-9sH583RDp4DftbO29ksMGwKfb1CIU.jpg?imwidth=450',
  },
  title: 'liked 8 posts',
};
export default class LikeScreen extends React.Component {
  onPress = user => {
    NavigationService.navigate('Profile', { user });
  };

  searchFilterFunction = () => {};

  render() {
    const { state = {} } = this.props.navigation;
    const { data = [someUser, someUser, someUser, someUser] } =
      state.params || {};

    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          containerStyle={{ backgroundColor: 'white' }}
          inputStyle={{
            borderRadius: 5,
            backgroundColor: '#F1F2F3',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
          placeholder="Search"
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
        />
        <UserList style={{ flex: 1 }} data={data} onPress={this.onPress} />
      </View>
    );
  }
}
