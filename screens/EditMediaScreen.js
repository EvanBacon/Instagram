import React from 'react';

import { View, Button, Image, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { UserList } from '../components/UserList';
import NavigationService from '../navigation/NavigationService';

const someUser = {
  account: 'notbrent',
  source: {
    uri: 'https://i.cspa.io/user_1092/89c808b0-24f0-4be3-94d4-b2b7af2ca987/400x.png',
  },
  title: 'liked 8 posts',
};

const filters = [
  {
    title: 'Normal',
    id: 'normal',
  },
  {
    title: 'Toaster',
    id: 'toaster',
  },
  {
    title: 'Rise',
    id: 'rise',
  },
  {
    title: 'Reyes',
    id: 'reyes',
  },
  {
    title: 'Hefe',
    id: 'hefe',
  },
];

const FilterListItem = ({ title, uri, id }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ marginBottom: 12, fontSize: 12 }}>{title}</Text>
    <TouchableOpacity
      style={{
        aspectRatio: 1,
        height: 100,
        width: 100,
      }}>
      <View
        style={{
          flex: 1,
          overflow: 'visible',
          shadowRadius: 8,
          shadowColor: 'rgba(0,0,0,0.8)',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 3 },
        }}>
        <Image
          style={{
            flex: 1,
          }}
          source={{ uri }}
        />
      </View>
    </TouchableOpacity>
  </View>
);

const FiltersFlatList = ({ uri }) => (
  <FlatList
    horizontal
    contentContainerStyle={{
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
    style={{ flex: 1 }}
    data={filters}
    keyExtractor={({ id }) => id}
    renderItem={({ item }) => <FilterListItem uri={uri} {...item} />}
  />
);

export default class EditMediaScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Camera Roll',
      headerRight: (
        <View style={{ marginRight: 5 }}>
          <Button
            title="Next"
            onPress={() => {
              navigation.navigate('EditMedia');
            }}
          />
        </View>
      ),
    };
  };
  static defaultProps = {
    comments: [someUser, someUser, someUser, someUser],
    date: 'August 29',
  };

  render() {
    const uri =
      'https://vignette.wikia.nocookie.net/fairytail/images/c/ca/Natsu_X792.png/revision/latest?cb=20181111122101';
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ flex: 2 }} source={{ uri }} />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
          <FiltersFlatList uri={uri} />
        </View>
        <BottomTabBar
          items={[
            { text: 'Filter', id: 'filter' },
            { text: 'Trim', id: 'trim' },
            { text: 'Cover', id: 'cover' },
          ]}
        />
      </View>
    );
  }
}

const BottomTabBarButton = ({ children, ...props }) => (
  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} {...props}>
    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>{children}</Text>
  </TouchableOpacity>
);
const BottomTabBar = ({ items }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: 'rgba(0, 0, 0, .3)',
      height: 49,
    }}>
    {items.map(item => (
      <BottomTabBarButton key={item.id}>{item.text}</BottomTabBarButton>
    ))}
  </View>
);
