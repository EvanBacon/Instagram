import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import Square from './Square';
import NavigationService from '../navigation/NavigationService';

export default class PhotoGridItem extends React.PureComponent {
  render() {
    const { hasMulti } = this.props;
    return (
      <Square
        style={{
          aspectRatio: 1,
          flex: 0.333,
          marginRight: 1,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('Profile_Details', { item: this.props })
          }
          activeOpacity={0.6}
          style={{ flex: 1 }}
        >
          <Image
            style={{
              resizeMode: 'cover',
              flex: 1,
            }}
            source={this.props.source}
          />
        </TouchableOpacity>

        {hasMulti && (
          <Ionicons
            style={{
              transform: [{ scaleX: -1 }],
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            name={'md-copy'}
            size={26}
            color={'white'}
          />
        )}
      </Square>
    );
  }
}
