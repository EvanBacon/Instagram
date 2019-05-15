import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
  Animated,
  Easing,
  Platform,
  StyleSheet,
} from 'react-native';

import renderNode from './renderNode';
// import { TextPropTypes } from '../config';

// import Icon from '../icons/Icon';

const renderText = (content, defaultProps, style) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

class Input extends React.Component {
  shakeAnimationValue = new Animated.Value(0);

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  isFocused() {
    return this.input.isFocused();
  }

  setNativeProps(nativeProps) {
    this.input.setNativeProps(nativeProps);
  }

  shake = () => {
    const { shakeAnimationValue } = this;

    shakeAnimationValue.setValue(0);
    // Animation duration based on Material Design
    // https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
    Animated.timing(shakeAnimationValue, {
      duration: 375,
      toValue: 3,
      ease: Easing.bounce,
    }).start();
  };

  render() {
    const {
      containerStyle,
      inputContainerStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIcon,
      rightIconContainerStyle,
      inputComponent: InputComponent = TextInput,
      inputStyle,
      errorProps,
      errorStyle,
      errorMessage,
      label,
      labelStyle,
      labelProps,
      theme = {},
      ...attributes
    } = this.props;

    const translateX = this.shakeAnimationValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0, 15, 0, -15, 0],
    });

    return (
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        {renderText(label, { style: labelStyle, ...labelProps }, styles.label)}

        <Animated.View
          style={StyleSheet.flatten([
            styles.inputContainer,
            inputContainerStyle,
            { transform: [{ translateX }] },
          ])}
        >
          {leftIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                leftIconContainerStyle,
              ])}
            >
              {renderNode(null, leftIcon)}
            </View>
          )}

          <InputComponent
            testID="RNE__Input__text-input"
            underlineColorAndroid="transparent"
            {...attributes}
            ref={ref => {
              this.input = ref;
            }}
            style={StyleSheet.flatten([styles.input, inputStyle])}
          />

          {rightIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                rightIconContainerStyle,
              ])}
            >
              {renderNode(null, rightIcon)}
            </View>
          )}
        </Animated.View>

        {!!errorMessage && (
          <Text
            {...errorProps}
            style={StyleSheet.flatten([styles.error, errorStyle && errorStyle])}
          >
            {errorMessage}
          </Text>
        )}
      </View>
    );
  }
}

Input.propTypes = {
  //   containerStyle: ViewPropTypes.style,
  //   inputContainerStyle: ViewPropTypes.style,

  //   leftIconContainerStyle: ViewPropTypes.style,

  //   rightIconContainerStyle: ViewPropTypes.style,
  //   inputStyle: TextPropTypes.style,
  inputComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  // eslint-disable-next-line react/forbid-prop-types
  shake: PropTypes.any,
  errorProps: PropTypes.object,
  //   errorStyle: TextPropTypes.style,
  errorMessage: PropTypes.string,
  label: PropTypes.node,
  //   labelStyle: TextPropTypes.style,
  labelProps: PropTypes.object,
  theme: PropTypes.object,
};

const styles = {
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#f5f5f5',
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  input: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    flex: 1,
    minHeight: 40,
  },
  error: {
    margin: 5,
    fontSize: 12,
    color: 'red',
  },
  label: {
    fontSize: 16,
    color: '#f5f5f5',
    fontWeight: 'bold',
  },
};

export default Input;
