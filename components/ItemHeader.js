import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { profileImageSize, Icon } from './FeedList';
export class ItemHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, location, source } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 6,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{
              aspectRatio: 1,
              backgroundColor: '#d8d8d8',
              borderWidth: StyleSheet.hairlineWidth,
              width: profileImageSize,
              borderRadius: profileImageSize / 2,
              marginRight: 12,
              resizeMode: 'cover',
            }}
            source={source}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
            <Text style={{ fontSize: 16, opacity: 0.8 }}>
              {location || 'Legoland'}
            </Text>
          </View>
        </View>
        <Icon name="ios-more" />
      </View>
    );
  }
}
