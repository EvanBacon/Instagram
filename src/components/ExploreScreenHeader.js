import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import SearchBar from './SearchBar';
import NavigationService from '../navigation/NavigationService';
export default class Header extends React.Component {
  onPress = user => {
    NavigationService.navigate('Profile', { user });
  };

  searchFilterFunction = () => {};

  render() {
    // const { state = {} } = this.props.navigation;
    // const { data = [someUser, someUser, someUser, someUser] } =
    //   state.params || {};

    const buttonWidth = 36;
    return (
      <View
        style={{
          height: 96,
          ...ifIphoneX(
            {
              paddingTop: 50,
            },
            {
              paddingTop: 20,
            }
          ),
        }}>
        <View style={{ flex: 1 }}>
          <SearchBar
            containerStyle={{
              borderWidth: 0,
              borderColor: undefined,
              borderBottomColor: undefined,
              borderBottomWidth: undefined,
              borderTopColor: undefined,
              borderTopWidth: undefined,
              backgroundColor: 'white',
              width: Dimensions.get('window').width - buttonWidth,
            }}
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
          <View
            style={{
              flex: 1,
              position: 'absolute',
              right: 0,
              bottom: 0,
              top: 0,
              width: buttonWidth,
              paddingHorizontal: 8,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {}}>
              <Ionicons name="md-camera" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
