import React from 'react';
import { View } from 'react-native';
import Stat from './Stat';
export default class StatsBar extends React.Component {
  render() {
    const { stats } = this.props;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {stats.map(({ title, value, onPress }) => (
          <Stat key={title} title={title} onPress={onPress}>
            {value}
          </Stat>
        ))}
      </View>
    );
  }
}
