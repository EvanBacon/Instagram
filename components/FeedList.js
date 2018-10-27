import React, { PureComponent } from 'react';
import { Text, FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item } from './Item';

class Footer extends PureComponent {
  render() {
    return (
      <View>
        <Text onPress={this.props.onPress}>Load More...</Text>
      </View>
    );
  }
}

export const profileImageSize = 48;

export class IconBar extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="ios-heart-outline" />
          <Icon name="ios-chatbubbles-outline" />
          <Icon name="ios-send-outline" />
        </View>
        <Icon name="ios-bookmark-outline" />
      </View>
    );
  }
}

export const Icon = ({ name }) => (
  <Ionicons
    style={{ marginHorizontal: 4 }}
    name={name}
    size={26}
    color={'black'}
  />
);

export default class FeedList extends React.Component {
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        renderItem={({ item }) => <Item {...item} />}
        ListFooterComponent={props => (
          <Footer {...props} onPress={onPressFooter} />
        )}
        keyExtractor={item => item.key}
        {...props}
      />
    );
  }
}
