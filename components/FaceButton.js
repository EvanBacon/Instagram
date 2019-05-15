import React from 'react';
import IconButton from './IconButton';
export default class FaceButton extends React.Component {
  state = {
    isActive: false,
  };
  onPress = () => {
    this.setState({ isActive: !this.state.isActive });
  };
  render() {
    return (
      <IconButton
        {...this.props}
        onPress={this.onPress}
        active={this.state.isActive}
        name={`face`}
      />
    );
  }
}
