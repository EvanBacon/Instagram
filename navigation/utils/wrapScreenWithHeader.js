import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';

import HeaderContainer from '../HeaderContainer';

export default function wrapScreenWithHeader(Comp) {
  return class extends React.Component {
    static navigationOptions = Comp.navigationOptions;
    static path = Comp.path;
    render() {
      const { props } = this;
      return (
        <View style={{ paddingTop: 64, overflow: 'scroll' }}>
          <HeaderContainer>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => props.navigation.goBack()} />
              <Appbar.Content title={Comp.title} />
            </Appbar.Header>
          </HeaderContainer>
          <Comp {...props} />
        </View>
      );
    }
  };
}
