import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FeedDisplayOptionButton } from './FeedDisplayOptionButton';

export const DISPLAY_FORMATS = ['grid', 'list', 'tag-user'];

export default class FeedDisplayRow extends React.Component {
  render() {
    const { onSelect, selected } = this.props;
    return (
      <View style={styles.row}>
        {DISPLAY_FORMATS.map(tag => {
          return (
            <FeedDisplayOptionButton
              icon={tag}
              selected={tag === selected}
              key={tag}
              onPress={() => onSelect(tag)}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
    height: 48,
  },
});
