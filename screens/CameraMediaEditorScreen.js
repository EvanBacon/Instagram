import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import FaceButton from '../components/FaceButton';
import IconButton from '../components/IconButton';
import InstaIcon from '../components/InstaIcon';
import dispatch from '../rematch/dispatch';

const GradientHeader = ({ style, ...props }) => (
  <LinearGradient
    colors={['rgba(0,0,0,0.3)', 'transparent']}
    start={[0.5, 0.0]}
    end={[0.5, 1.0]}
    style={StyleSheet.flatten([
      {
        position: 'absolute',
        top: 0,
        paddingTop: Constants.statusBarHeight || 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 12,
      },
      style,
    ])}
    {...props}
  />
);

class EditorScreen extends React.Component {
  render() {
    const sendButtonHeight = 36;

    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'black' }]}>
        <Image
          style={{ flex: 1, resizeMode: 'cover' }}
          source={this.props.image}
        />
        <GradientHeader>
          <EditorIcon
            name={'cancel'}
            onPress={() => {
              dispatch().image.set(null);
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <EditorIcon
              name="save"
              onPress={() => {
                const ancorTag = document.createElement('a');
                ancorTag.download = `Expo-Finstaham-${Date.now()}.png`;
                ancorTag.href = this.props.image;
                ancorTag.target = '_blank';
                document.body.appendChild(ancorTag);
                ancorTag.click();
                document.body.removeChild(ancorTag);
              }}
            />
            <FaceButton containerStyle={{ marginHorizontal: 4 }} />
            <EditorIcon name="stickers" enabled={false} onPress={() => {}} />
            <EditorIcon name="draw" enabled={false} onPress={() => {}} />
            <EditorIcon name="letter" enabled={false} onPress={() => {}} />
          </View>
        </GradientHeader>

        <View
          style={{
            display: 'flex',
            paddingVertical: 24,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 16,
          }}
        >
          <View />
          <TouchableOpacity style={{}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                height: sendButtonHeight,
                borderRadius: sendButtonHeight / 2,
                shadowRadius: 6,
                shadowOpacity: 0.3,
                paddingHorizontal: 12,
                flexDirection: 'row',
              }}
            >
              <Text
                style={{ textAlign: 'left', marginBottom: 2, fontSize: 12 }}
                onPress={() => {}}
              >
                Send To
              </Text>
              <InstaIcon name="chevron-right" color="black" size={18} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(({ image }) => ({ image }))(EditorScreen);

const EditorIcon = ({ style, ...props }) => (
  <IconButton
    containerStyle={[{ marginHorizontal: 4 }, style]}
    color="white"
    {...props}
  />
);
