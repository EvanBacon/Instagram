import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import ExploreScreenHeader from '../components/ExploreScreenHeader';
export default class ExploreScreen extends PureComponent {
  static navigationOptions = {
    headerStyle: { borderWidth: 0 },
    header: props => <ExploreScreenHeader {...props} />,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> ExploreScreen </Text>
      </View>
    );
  }
}
