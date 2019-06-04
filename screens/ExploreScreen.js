import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import ExploreScreenHeader from '../components/ExploreScreenHeader';

export default class ExploreScreen extends PureComponent {
  static navigationOptions = {
    headerStyle: { borderWidth: 0 },
    header: props => <ExploreScreenHeader {...props} />,
  };
  state = {};

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> lol... this is hard </Text>
      </View>
    );
  }
}
