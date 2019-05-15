import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

export default class FeedFooter extends PureComponent {
  render() {
    const height = 36;
    return (
      <View style={{ justifyContent: 'center', paddingVertical: 12, alignItems: 'center' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height,
            borderRadius: height / 2,
            shadowRadius: 6,
            shadowOpacity: 0.3,
            paddingHorizontal: 12,
          }}>
          <Text style={{ textAlign: 'center' }} onPress={this.props.onPress}>
            Load More...
          </Text>
        </View>
      </View>
    );
  }
}
