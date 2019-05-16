import React from 'react';
import { TouchableHighlight, View } from 'react-native';

import InstaIcon from './InstaIcon';

export class FeedDisplayOptionButton extends React.Component {
  render() {
    const { icon, onPress, selected } = this.props;
    return (
      <TouchableHighlight
        underlayColor={'rgba(0,0,0,0.02)'}
        onPress={onPress}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 8,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: selected ? 1 : 0.5,
          }}
        >
          <InstaIcon size={32} color={'black'} name={icon} />
        </View>
      </TouchableHighlight>
    );
  }
}
