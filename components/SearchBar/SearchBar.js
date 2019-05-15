import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

// import Icon from '../icons/Icon';
import Input from './Input';
import renderNode from './renderNode';

// import ViewPropTypes from '../config/ViewPropTypes';
const IOS_GRAY = '#dcdce1';
import { Ionicons } from '@expo/vector-icons';

const defaultSearchIcon = (
  <Ionicons size={20} name="ios-search" color={IOS_GRAY} />
);
const defaultClearIcon = props => (
  <Ionicons size={20} name="ios-close-circle" color={IOS_GRAY} {...props} />
);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    const { value } = props;

    this.state = {
      hasFocus: false,
      isEmpty: value ? value === '' : true,
      cancelButtonWidth: null,
    };
  }

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClear();
  };

  cancel = () => {
    this.blur();
    this.props.onCancel();
  };

  onFocus = () => {
    this.props.onFocus();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();

    this.setState({
      hasFocus: true,
    });
  };

  onBlur = () => {
    this.props.onBlur();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();

    this.setState({
      hasFocus: false,
    });
  };

  onChangeText = text => {
    this.props.onChangeText(text);
    this.setState({ isEmpty: text === '' });
  };

  render() {
    const {
      cancelButtonProps,
      cancelButtonTitle,
      clearIcon,
      containerStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputContainerStyle,
      inputStyle,
      placeholderTextColor,
      showLoading,
      loadingProps,
      searchIcon,
      onClear,
      round,
      ...attributes
    } = this.props;
    const { hasFocus, isEmpty } = this.state;

    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;

    const {
      buttonStyle,
      buttonTextStyle,
      color: buttonColor,
      disabled: buttonDisabled,
      buttonDisabledStyle,
      buttonDisabledTextStyle,
      ...otherCancelButtonProps
    } = cancelButtonProps;

    return (
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        <Input
          {...attributes}
          testID="searchInput"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={input => {
            this.input = input;
          }}
          inputStyle={StyleSheet.flatten([styles.input, inputStyle])}
          containerStyle={{
            paddingHorizontal: 0,
          }}
          inputContainerStyle={StyleSheet.flatten([
            styles.inputContainer,
            hasFocus && { marginRight: this.state.cancelButtonWidth },
            inputContainerStyle,
          ])}
          leftIcon={searchIcon}
          leftIconContainerStyle={StyleSheet.flatten([
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ])}
          placeholderTextColor={placeholderTextColor}
          rightIcon={
            <View style={{ flexDirection: 'row' }}>
              {showLoading && (
                <ActivityIndicator
                  key="loading"
                  style={StyleSheet.flatten([{ marginRight: 5 }, loadingStyle])}
                  {...otherLoadingProps}
                />
              )}
              {!isEmpty && clearIcon({ onPress: this.clear, key: 'cancel' })}
            </View>
          }
          rightIconContainerStyle={StyleSheet.flatten([
            styles.rightIconContainerStyle,
            rightIconContainerStyle,
          ])}
        />

        <View
          style={StyleSheet.flatten([
            styles.cancelButtonContainer,
            {
              opacity: this.state.cancelButtonWidth === null ? 0 : 1,
              right: hasFocus ? 0 : -this.state.cancelButtonWidth,
            },
          ])}
          onLayout={event =>
            this.setState({ cancelButtonWidth: event.nativeEvent.layout.width })
          }
        >
          <TouchableOpacity
            accessibilityRole="button"
            onPress={this.cancel}
            disabled={buttonDisabled}
            {...otherCancelButtonProps}
          >
            <View style={[buttonStyle, buttonDisabled && buttonDisabledStyle]}>
              <Text
                style={[
                  styles.buttonTextStyle,
                  buttonColor && { color: buttonColor },
                  buttonTextStyle,
                  buttonDisabled &&
                    (buttonDisabledTextStyle || styles.buttonTextDisabled),
                ]}
                disabled={buttonDisabled}
              >
                {cancelButtonTitle}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SearchBar.propTypes = {
  value: PropTypes.string,
  cancelButtonProps: PropTypes.object,
  cancelButtonTitle: PropTypes.string,
  // clearIcon: nodeType,
  // searchIcon: nodeType,
  loadingProps: PropTypes.object,
  showLoading: PropTypes.bool,
  onClear: PropTypes.func,
  onCancel: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  // containerStyle: ViewPropTypes.style,
  // leftIconContainerStyle: ViewPropTypes.style,
  // rightIconContainerStyle: ViewPropTypes.style,
  // inputContainerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  placeholderTextColor: PropTypes.string,
};

SearchBar.defaultProps = {
  value: '',
  cancelButtonTitle: 'Cancel',
  loadingProps: {},
  cancelButtonProps: {},
  showLoading: false,
  onClear: () => null,
  onCancel: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onChangeText: () => null,
  placeholderTextColor: IOS_GRAY,
  searchIcon: defaultSearchIcon,
  clearIcon: defaultClearIcon,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7d7d7d',
    paddingBottom: 13,
    paddingTop: 13,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  input: {
    marginLeft: 6,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#7d7d7d',
    borderRadius: 9,
    minHeight: 36,
    marginLeft: 8,
    marginRight: 8,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
  buttonTextStyle: {
    color: '#7d7d7d',
    textAlign: 'center',
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#7d7d7d',
  },
  cancelButtonContainer: {
    position: 'absolute',
  },
});

export default SearchBar;
