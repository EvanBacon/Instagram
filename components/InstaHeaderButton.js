import React from 'react';
import { TouchableOpacity } from 'react-native';
import InstaIcon from './InstaIcon';

export default class InstaHeaderButton extends React.PureComponent {
  render() {
    const { onPress, touchableStyle, ...props } = this.props;
    return (
      <TouchableOpacity style={[{ marginHorizontal: 12 }, touchableStyle]} onPress={onPress}>
        <InstaIcon size={32} color={'black'} {...props} />
      </TouchableOpacity>
    );
  }
}
