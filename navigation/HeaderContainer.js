import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReactDOM from 'react-dom';

export class HeaderContainer extends React.PureComponent {
  render() {
    return (
      <View
        accessibilityRole="banner"
        style={[styles.header, this.props.style]}
      >
        <nav role="navigation">{this.props.children}</nav>
      </View>
    );
  }
}

export class HeaderPortal extends React.PureComponent {
  render() {
    return ReactDOM.createPortal(this.props.children, global.document.body);
  }
}

export default ({ ...props }) => (
  <HeaderPortal>
    <HeaderContainer {...props} />
  </HeaderPortal>
);

const styles = StyleSheet.create({
  header: {
    position: 'fixed',
    left: 0,
    right: 0,
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
});
