import React, { Component } from 'react';
import { View } from 'react-native';
import {
  LongPressGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

export default class TapView extends Component {
  onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      this.props.onLongPress && this.props.onLongPress(event);
    }
  };
  onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      this.props.onTap && this.props.onTap(event);
    }
  };
  onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      this.props.onDoubleTap && this.props.onDoubleTap(event);
    }
  };
  render() {
    const { id, enabled, style } = this.props;
    return (
      <LongPressGestureHandler
        enabled={enabled}
        onHandlerStateChange={this.onHandlerStateChange}
        minDurationMs={800}
      >
        <TapGestureHandler
          enabled={enabled}
          onHandlerStateChange={this.onSingleTap}
          waitFor={'double_tap' + id}
        >
          <TapGestureHandler
            enabled={enabled}
            id={'double_tap' + id}
            onHandlerStateChange={this.onDoubleTap}
            numberOfTaps={2}
          >
            <View style={style}>{this.props.children}</View>
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    );
  }
}
