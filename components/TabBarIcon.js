import React from 'react';
import { View } from 'react-native';

import Colors from '../constants/Colors';
import InstaIcon from './InstaIcon';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View style={{ width: '100%', flex: 1, paddingVertical: 8 }}>
        <InstaIcon
          color={'black'}
          active={this.props.focused}
          name={this.props.name}
        />
      </View>
    );
  }
}
