import React from 'react';
import { TouchableOpacity } from 'react-native';
import InstaIcon from './InstaIcon';

export default class InstaHeaderButton extends React.PureComponent {
  render() {
    const { onPress, disabled, touchableStyle, ...props } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[{ marginHorizontal: 12 }, touchableStyle]}
        onPress={onPress}
      >
        <InstaIcon disabled={disabled} size={32} color={'black'} {...props} />
      </TouchableOpacity>
    );
  }
}
