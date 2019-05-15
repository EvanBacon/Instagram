import React from 'react';
import { TouchableOpacity } from 'react-native';

import InstaIcon from './InstaIcon';

export default class LikeButton extends React.Component {
  state = { active: false };
  onPress = () => {
    this.setState({ active: !this.state.active });
  };
  render() {
    const { color = 'black', active, ...props } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <InstaIcon
          size={16}
          active={this.state.active}
          {...props}
          color={this.state.active ? 'red' : color}
          name="like"
        />
      </TouchableOpacity>
    );
  }
}
