import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import { connect } from 'react-redux';
import { indicatorAnim } from '../../rematch/stories';
class Indicator extends React.Component {
  state = { width: 0 };

  setWidthFromLayout = ({ nativeEvent: { layout } }) => {
    const { width } = layout;
    this.setState({ width });
  };

  render() {
    const { animate, seen, coming, story, i } = this.props;
    let style = {};

    if (animate) {
      style = {
        width: indicatorAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this.state.width],
          extrapolate: 'clamp',
        }),
      };
    } else if (story.idx > i) {
      // seen
      style = { flex: 1 };
    } else if (story.idx <= i) {
      // coming
      style = { width: 0 };
    }

    return (
      <View style={styles.line} onLayout={this.setWidthFromLayout}>
        <Animated.View style={[styles.progress, style]} />
      </View>
    );
  }
}

export default connect(({ stories }) => ({ ...stories }))(Indicator);

const styles = StyleSheet.create({
  line: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 1,
    height: 2,
  },
  progress: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: 2,
  },
});
