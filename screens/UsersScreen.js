import React from 'react';
import { View } from 'react-native';

import SearchBar from '../components/SearchBar';
import { UserList } from '../components/UserList';
import NavigationService from '../navigation/NavigationService';

const someUser = {
  account: 'ccheever',
  hasFollowButton: true,
  isFollowing: true,
  onPressFollowing: () => {},
  source: {
    uri:
      'https://i.cspa.io/user_1092/89c808b0-24f0-4be3-94d4-b2b7af2ca987/400x.png',
  },
  title: 'liked 8 posts',
};
export default class UsersScreen extends React.Component {
  static navigationOptions = {};
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
