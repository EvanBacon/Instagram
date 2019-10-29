import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Camera } from 'expo-camera';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { element, func, oneOfType } from 'prop-types';
import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import Assets from '../Assets';
import FaceButton from '../components/FaceButton';
import IconButton from '../components/IconButton';
import Header from '../components/MediaHeader';
import ProfileImage from '../components/ProfileImage';
import Slider from '../components/Slider';
import ViewPager from '../components/ViewPager';
import MediaLibraryData from '../constants/MediaLibraryData';
import NavigationService from '../navigation/NavigationService';
import dispatch from '../rematch/dispatch';
import EditorScreen from './CameraMediaEditorScreen';
import GradientScreen from './GradientScreen';
import MusicScreen from './MusicScreen';

// import Popular from './data/Popular.json';
const pages = [
  {
    name: 'Type',
    icon: null,
    id: 'type',
    isFlipable: true,
    screen: props => <GradientScreen {...props} />,
    headerLeftIconName: null,
  },
  {
    name: 'Music',
    id: 'music',
    isFilterable: true,
    hideFooter: true,
    icon: Assets['inf.png'],
    screen: () => <MusicScreen />,
  },
  { name: 'Live', id: 'live', isFilterable: true, icon: null },
  {
    name: 'Boomerang',
    id: 'boomerang',
    isFilterable: true,
    icon: Assets['inf.png'],
  },
  { name: 'Normal', id: 'normal', isFilterable: true, icon: null },
  {
    name: 'Superzoom',
    id: 'superzoom',
    isFilterable: false,
    icon: Assets['rewind.png'],
  },
  { name: 'Focus', id: 'focus', isFilterable: false, icon: Assets['inf.png'] },
  {
    name: 'Rewind',
    id: 'rewind',
    isFilterable: true,
    icon: Assets['rewind.png'],
  },
  {
    name: 'Hands-Free',
    id: 'handsfree',
    isFilterable: true,
    icon: Assets['ball.png'],
  },
].map(value => {
  return {
    ...value,
    name: value.name.toUpperCase(),
  };
});

// const INITIAL_TAB_ID = 'music';
const INITIAL_TAB_ID = 'normal';
const INITIAL_TAB = Math.max(
  0,
  pages.findIndex(({ id }) => id === INITIAL_TAB_ID),
);

const types = [
  {
    name: 'Strong',
    style: {
      fontFamily: 'insta-strong',
      fontSize: 36,
    },
  },
  {
    name: 'Modern',
    style: {
      fontFamily: 'insta-modern',
      fontSize: 36,
    },
  },
  {
    name: 'Neon',
    style: {
      fontFamily: 'insta-neon',
      fontSize: 56,
    },
  },
  {
    name: 'Typewriter',
    style: {
      fontFamily: 'insta-typewriter',
      fontSize: 36,
    },
  },
];

const gradients = [
  {
    start: [1, 0],
    end: [0, 0.9],
    colors: ['#E4C9BF', '#E89D99', '#DF6D71'],
    theme: 'light',
  },
  {
    start: [1, 0],
    end: [0, 1],
    colors: ['#62BFEA', '#76CEF5', '#82BFD7'],
    theme: 'light',
  },
  {
    start: [0, 0],
    end: [1, 1],
    colors: ['#F3F4F2', '#BDBDBC'],
    theme: 'dark',
  },
  {
    start: [0, 0],
    end: [1, 1],
    colors: ['#222222', '#010102'],
    theme: 'light',
  },
];

let takePictureGlobal;
class CameraScreen extends React.Component {
  static defaultProps = {
    headerLeftIconName: 'settings',
    headerLeft: props => (
      <IconButton
        enabled={!DISABLE_CAMERA_SETTINGS}
        {...props}
        onPress={() => NavigationService.navigate('CameraSettingsScreen')}
      />
    ),
  };

  componentDidMount() {
    takePictureGlobal = this.takePicture;
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({
        onPictureSaved: photo => {
          dispatch().image.set(photo);
        },
      });
    }
  };

  render() {
    const {
      page,
      headerLeft,
      camera = {},
      headerLeftIconName = 'settings',
      hasPermission,
    } = this.props;
    return (
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {!hasPermission && <CameraPermissionScreen />}
        {hasPermission && (
          <Camera
            ref={ref => (this.camera = ref)}
            style={{ flex: 1 }}
            {...camera}
          />
        )}
        {page.id !== 'music' && (
          <Header>
            {headerLeft({ name: headerLeftIconName })}
            <IconButton
              name={'chevron-right'}
              onPress={() => {
                NavigationService.navigate('SocialUI');
              }}
            />
          </Header>
        )}
      </View>
    );
  }
}

function CameraPermissionScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ marginBottom: 36 }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Share on Expogram
        </Text>
        <Text style={{ color: 'white', opacity: 0.6, textAlign: 'center' }}>
          Enable access so you can start taking photos and videos.
        </Text>
      </View>

      <View>
        <ConnectedPermissionButton
          name="Camera"
          permission={Permissions.CAMERA}
        />
        <ConnectedPermissionButton
          name="Microphone"
          permission={Permissions.AUDIO_RECORDING}
        />
      </View>
    </View>
  );
}

function PermissionButton({ permission, name, ...props }) {
  const hasPermission = props[permission] === 'granted';
  const isDenied = props[permission] === 'denied';
  const text =
    hasPermission == null
      ? 'Loading...'
      : hasPermission
      ? `${name} Access Enabled`
      : `Enable ${name} Access`;

  const style = {
    color: isDenied ? 'red' : hasPermission ? 'lightgray' : '#7e7ec3',
    textAlign: 'center',
    padding: 12,
  };
  return (
    <Text
      style={style}
      onPress={async () => {
        dispatch().permissions.askAsync({ permission });
      }}
      pointerEvents={hasPermission ? 'none' : undefined}
    >
      {text}
    </Text>
  );
}

const ConnectedPermissionButton = connect(({ permissions }) => ({
  ...permissions,
}))(PermissionButton);

const ConnectedCameraScreen = connect(({ camera, permissions }) => ({
  camera,
  hasPermission:
    permissions[Permissions.CAMERA] === 'granted' &&
    permissions[Permissions.AUDIO_RECORDING] === 'granted',
}))(CameraScreen);

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class EditorComboScreen extends React.Component {
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MediaContainerScreen />
        {this.props.image && <EditorScreen image={this.props.image} />}
      </View>
    );
  }
}

const ConnectedEditorComboScreen = connect(({ image }) => ({ image }))(
  EditorComboScreen,
);

export default ConnectedEditorComboScreen;

const DISABLE_BOTTOM_DRAWER = false;
const DISABLE_CAMERA_SETTINGS = true;

class MediaContainerScreen extends React.Component {
  animation = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.onScroll = Animated.event(
      [
        {
          nativeEvent: { contentOffset: { y: this.animation } },
        },
      ],
      {
        useNativeDriver: Platform.OS !== 'web',
      },
    );
  }

  openMediaDrawer = () => {
    if (DISABLE_BOTTOM_DRAWER || !this.scrollView) {
      return;
    }
    this.scrollView._component.scrollToEnd({ duration: 300, animated: true });
  };
  openCamera = () => {
    if (DISABLE_BOTTOM_DRAWER || !this.scrollView) {
      return;
    }
    this.scrollView._component.scrollTo({ x: 0, y: 0, duration: 300 });
  };

  render() {
    if (DISABLE_BOTTOM_DRAWER) {
      return (
        <Resizable>
          {layout => <CameraContainerScreen window={layout} />}
        </Resizable>
      );
    }
    return (
      <Resizable>
        {layout => {
          const drawerHeight = layout.height * 0.9;
          return (
            <AnimatedScrollView
              ref={ref => (this.scrollView = ref)}
              scrollEventThrottle={16}
              onScroll={this.onScroll}
              pagingEnabled
              style={{ flex: 1 }}
              contentContainerStyle={{ height: layout.height + drawerHeight }}
            >
              <BlurredOptionsContainer
                height={layout.height}
                animation={this.animation}
                onPress={this.openCamera}
              >
                <CameraContainerScreen
                  window={layout}
                  openMediaDrawer={this.openMediaDrawer}
                />
              </BlurredOptionsContainer>
              <MediaScreen
                window={layout}
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  height: drawerHeight,
                }}
              />
            </AnimatedScrollView>
          );
        }}
      </Resizable>
    );
  }
}

export class Resizable extends React.Component {
  static displayName = 'Resizable';
  static propTypes = {
    children: oneOfType([func, element]),
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.resize);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.resize);
  }

  resize = ({ window }) => {
    console.log('layout', window);

    this.setState(state => ({ ...state, ...window }));
  };

  state = { ...Dimensions.get('window') };

  render() {
    const { children } = this.props;
    const child =
      typeof children === 'function' ? children(this.state) : children;

    return React.cloneElement(React.Children.only(child), {});
  }
}

class BlurredOptionsContainer extends React.Component {
  render() {
    const opacity = this.props.animation.interpolate({
      inputRange: [0, this.props.height],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={{
          flex: 1,
          maxHeight: this.props.height,
          minHeight: this.props.height,
        }}
      >
        {this.props.children}
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, opacity }}
          pointerEvents={this.props.isEnabled ? 'auto' : 'none'}
        >
          <TouchableWithoutFeedback
            style={StyleSheet.absoluteFill}
            onPress={this.props.onPress}
          >
            <BlurView
              tint={'dark'}
              intensity={50}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'stretch',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  padding: 8,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  LAST 24 HOURS
                </Text>

                <IconButton name={'camera'} />
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}

class MediaScreen extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <FlatList
          keyExtractor={(item, index) => index + '--'}
          renderItem={({ item }) => (
            <MediaItem window={this.props.window} {...item} />
          )}
          contentContainerStyle={{ padding: 1 }}
          style={{ flex: 1 }}
          data={MediaLibraryData}
          numColumns={3}
        />
      </View>
    );
  }
}

class MediaItem extends React.Component {
  onPress = () => {
    dispatch().image.set(this.props.image);
  };
  render() {
    const { height, width: screenWidth } = this.props.window;
    const width = screenWidth - 8;
    const aspectRatio = height / width;
    const itemWidth = width / 3;
    const itemHeight = itemWidth * aspectRatio;
    return (
      <TouchableOpacity
        style={{
          margin: 1,
          width: itemWidth,
          height: itemHeight,
          backgroundColor: 'black',
        }}
        onPress={this.onPress}
      >
        <Image
          style={{ flex: 1, resizeMode: 'cover' }}
          source={this.props.image}
        />
      </TouchableOpacity>
    );
  }
}

const USE_GRADIENT = true;

class CameraContainerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      index: INITIAL_TAB,
      selectedGradient: 0,
      selectedFont: 0,
    };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'insta-strong': Assets.fonts['insta-strong.otf'],
        'insta-neon': Assets.fonts['insta-neon.otf'],
        'insta-typewriter': Assets.fonts['insta-typewriter.ttf'],
        'insta-modern': Assets.fonts['insta-modern.ttf'],
      });
    } catch (error) {
    } finally {
      this.setState({ ready: true });
    }
  }

  onPressTypefaceButton = () => {
    this.setState({
      selectedFont: (this.state.selectedFont + 1) % types.length,
    });
  };

  render() {
    const {
      ready,
      index,
      selectedFont,
      selectedGradient,
      useGradientCamera,
    } = this.state;
    const { height, width } = this.props.window;
    if (!ready) {
      return <View />;
    }
    LayoutAnimation.easeInEaseOut();
    const page = pages[index];
    const typeface = types[selectedFont];
    const { theme: gradientTheme, ...gradient } = gradients[selectedGradient];
    return (
      <View
        style={{
          flex: 1,
          height,
          backgroundColor: 'black',
          justifyContent: 'flex-end',
        }}
      >
        <ConnectedCameraScreen
          page={page}
          headerLeftIconName={page.headerLeftIconName}
        />

        {USE_GRADIENT && (
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {page.screen &&
              page.screen({
                typeface,
                useGradientCamera,
                onPressTypefaceButton: this.onPressTypefaceButton,
                gradient,
                gradientTheme,
              })}
          </View>
        )}
        <MainFooter
          window={this.props.window}
          page={page}
          index={index}
          gradient={gradient}
          openMediaDrawer={this.props.openMediaDrawer}
          onPressGradientCameraButton={() => {
            this.setState({
              useGradientCamera: !useGradientCamera,
            });
          }}
          onPressGradientButton={() => {
            this.setState({
              selectedGradient: (selectedGradient + 1) % gradients.length,
            });
          }}
        />
        <Slider
          page={page}
          window={this.props.window}
          initialIndex={INITIAL_TAB}
          data={pages.map(value => value.name)}
          onIndexChange={index => {
            this.setState({ index });
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {Platform.OS === 'web' && (
            <View
              style={{
                width: 15,
                height: 15,
                borderTopLeftRadius: 2,
                backgroundColor: 'white',
                transform: [
                  { rotate: '45deg' },
                  { translateX: '50%' },
                  { translateY: '50%' },
                ],
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const userProfilePictureSize = 24;
const userProfilePictureIndicatorSize = userProfilePictureSize * 0.3;
class UserProfilePicture extends React.Component {
  render() {
    const { account } = this.props;

    return (
      <View
        style={{
          width: userProfilePictureSize,
          height: userProfilePictureSize,
          marginLeft: 4,
        }}
      >
        <ProfileImage
          style={{ flex: 1, borderRadius: userProfilePictureSize / 2 }}
          account={account}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'black',
            width: userProfilePictureIndicatorSize,
            height: userProfilePictureIndicatorSize,
            borderRadius: userProfilePictureIndicatorSize / 2,
            backgroundColor: 'lime',
          }}
        />
      </View>
    );
  }
}

class WhosActive extends React.Component {
  render() {
    const { users } = this.props;

    return (
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 10, color: 'white' }}>
          {users
            .slice(0, 2)
            .map(({ name }) => name)
            .join(', ') + `, and ${users.length - 2} others are active now`}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          {users.slice(0, 3).map((user, index) => (
            <UserProfilePicture key={index + '-img'} account={user.account} />
          ))}
        </View>
      </View>
    );
  }
}

class GoLiveButton extends React.Component {
  render() {
    const { animation, isActive } = this.props;

    const opacity = animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        pointerEvents={isActive ? 'auto' : 'none'}
        style={{ width: '100%', opacity }}
      >
        <TouchableOpacity style={{ flex: 1 }}>
          <View
            style={{
              height: innerCaptureButtonHeight,
              borderRadius: innerCaptureButtonHeight / 2,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              lineBreakMode="clip"
              numberOfLines={1}
              style={{ fontSize: 16 }}
            >
              Go Live
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const gradientButtonSize = 24;
const GradientButton = ({ gradient, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        borderWidth: 2,
        borderRadius: gradientButtonSize + 4,
        borderColor: 'white',
        padding: 2,
        backgroundColor: 'transparent',
      }}
    >
      <LinearGradient
        {...gradient}
        style={{
          width: gradientButtonSize,
          height: gradientButtonSize,
          borderRadius: gradientButtonSize / 2,
        }}
      />
    </View>
  </TouchableOpacity>
);

const users = [
  {
    name: 'Brent Vatne',
    account: 'notbrent',
  },
  {
    name: 'theavocoder',
    account: 'lydiahallie',
  },
  {
    name: 'expo',
    account: 'expo',
  },
  {
    name: 'Charlie Cheever',
    account: 'ccheever',
  },
  {
    name: 'James Ide',
    account: 'ji',
  },
];

class MainFooter extends React.Component {
  constructor(props) {
    super(props);

    this.liveAnimation = new Animated.Value(this.getAnimatedValue(props));
  }

  getAnimatedValue = ({ page }) => (page.id === 'live' ? 1 : 0);

  UNSAFE_componentWillReceiveProps(nextProps, prevState, snapshot) {
    if (nextProps.page.id !== this.props.page.id) {
      Animated.timing(this.liveAnimation, {
        toValue: this.getAnimatedValue(nextProps),
        duration: 300,
      }).start();
    }
  }

  render() {
    const {
      page,
      gradient,
      index,
      onPressGradientCameraButton,
      onPressGradientButton,
    } = this.props;

    const footerStyle = {
      display: page.hideFooter ? 'none' : 'flex',
      paddingHorizontal: 0,
      paddingVertical: 24,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 1,
    };

    switch (page.id) {
      case 'type':
        return (
          <View style={[footerStyle, { paddingHorizontal: 24 }]}>
            <GradientButton
              gradient={gradient}
              onPress={onPressGradientButton}
            />
            <CaptureButton
              onPress={global.takeGradientPictureGlobal}
              selectedIndex={index}
              icon={page.icon}
            />
            <IconButton
              onPress={onPressGradientCameraButton}
              key="camera"
              name={'camera'}
            />
          </View>
        );
      default: {
        const liveOpacity = this.liveAnimation.interpolate({
          inputRange: [0.2, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        const liveTranslationY = this.liveAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['-100%', '0%'],
        });

        return (
          <View
            style={{
              ...footerStyle,

              flexDirection: 'column',
              // alignItems: 'stretch',
              alignItems: 'center',
            }}
          >
            <Animated.View
              style={{
                opacity: liveOpacity,
                transform: [{ translateY: liveTranslationY }],
                marginBottom: 14,
                width: '80%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <WhosActive users={users} />
            </Animated.View>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FlashButtonContainer
                width={this.props.window.width}
                openMediaDrawer={this.props.openMediaDrawer}
                {...page}
              />
              <CaptureButtonContainer
                onCapture={() => takePictureGlobal()}
                selectedIndex={index}
                animation={this.liveAnimation}
                icon={page.icon}
                isActive={page.id === 'live'}
              />

              <FlipButtonContainer
                liveAnimation={this.liveAnimation}
                {...page}
              />
            </View>
          </View>
        );
      }
    }
  }
}

class CaptureButtonContainer extends React.Component {
  render() {
    const { isActive, selectedIndex, animation, icon, onCapture } = this.props;

    const opacity = animation.interpolate({
      inputRange: [0.2, 1],
      outputRange: [1, 0],
    });

    const width = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['10%', '50%'],
    });
    return (
      <Animated.View
        style={{
          width,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          pointerEvents={isActive ? 'none' : 'auto'}
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CaptureButton
            onPress={onCapture}
            selectedIndex={selectedIndex}
            icon={icon}
          />
        </Animated.View>
        <GoLiveButton
          animation={animation}
          isActive={isActive}
          pointerEvents={!isActive ? 'none' : 'auto'}
        />
      </Animated.View>
    );
  }
}

class FlashButtonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.animation = new Animated.Value(this.getAnimatedValue(props));
  }

  getAnimatedValue = ({ id }) => (id === 'live' ? 1 : 0);

  UNSAFE_componentWillReceiveProps(nextProps, prevState, snapshot) {
    if (nextProps.id !== this.props.id) {
      Animated.timing(this.animation, {
        toValue: this.getAnimatedValue(nextProps),
        duration: 300,
      }).start();
    }
  }

  render() {
    const isLive = this.props.id === 'live';
    const moveFlip = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['75%', '0%'],
    });

    const fadeFace = this.animation.interpolate({
      inputRange: [0, 0.8],
      outputRange: [1, 0],
    });

    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          // alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            marginLeft: this.props.width * 0.1,
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Animated.View
            style={{ position: 'absolute', left: 0, opacity: fadeFace }}
            pointerEvents={isLive ? 'none' : 'auto'}
          >
            <GalleryButton
              onPress={this.props.openMediaDrawer}
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/1052466125055746048/kMLDBsaD_400x400.jpg',
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              // right: 0,
              left: moveFlip,
              // opacity: fadeFace,
              // transform: [{ rotate: rotateFace }],
            }}
          >
            {!isLive && <FlashButton />}
            {isLive && <IconButton enabled={false} name="questions" />}
          </Animated.View>
        </View>
      </View>
    );
  }
}

const FlashNextState = {
  off: 'on',
  on: 'auto',
  auto: 'off',
};

class FlipCameraButton extends React.Component {
  state = {
    flashState: 'off',
  };
  animation = new Animated.Value(0);
  currentValue = 0;
  onPress = () => {
    this.currentValue -= 180;
    Animated.timing(this.animation, {
      toValue: this.currentValue,
      duration: 200,
    }).start();
    dispatch().camera.flip();
  };
  render() {
    const rotate = this.animation.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    return (
      <Animated.View style={{ transform: [{ rotate }] }}>
        <IconButton {...this.props} onPress={this.onPress} name={`flip`} />
      </Animated.View>
    );
  }
}

class FlashButton extends React.Component {
  state = {
    flashState: 'off',
  };
  onPress = () => {
    this.setState({ flashState: FlashNextState[this.state.flashState] });
  };
  render() {
    return (
      <IconButton
        {...this.props}
        onPress={this.onPress}
        name={`flash-${this.state.flashState}`}
      />
    );
  }
}

class FlipButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(props.isFilterable ? 0 : 1);
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevState, snapshot) {
    if (nextProps.isFilterable !== this.props.isFilterable) {
      Animated.timing(this.animation, {
        toValue: nextProps.isFilterable ? 0 : 1,
        duration: 300,
      }).start();
    }
  }

  render() {
    const moveFlip = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '50%'],
    });

    const rotateFace = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-30deg'],
    });

    const fadeFace = this.animation.interpolate({
      inputRange: [0, 0.8],
      outputRange: [1, 0],
    });

    const liveWidth = this.props.liveAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['50%', '75%'],
    });
    // const liveOffset = this.props.liveAnimation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0%', '30%'],
    // });

    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            width: liveWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Animated.View style={{ position: 'absolute', left: moveFlip }}>
            <FlipCameraButton />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              right: moveFlip,
              opacity: fadeFace,
              transform: [{ rotate: rotateFace }],
            }}
          >
            <FaceButton />
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const captureButtonHidth = 72;
const innerCaptureButtonHeight = captureButtonHidth * 0.75;
class CaptureButton extends React.Component {
  componentDidUpdate(prevProps) {
    // if (this.props.icon !== prevProps.icon) {
    //   this.state.animation.start();
    // }
  }

  render() {
    const { selectedIndex } = this.props;
    const width = 72;
    const innerWidth = width * 0.75;
    return (
      <TouchableOpacity
        style={{ height: width, width }}
        pointerEvents="box-only"
        onPress={this.props.onPress}
      >
        <BlurView
          pointerEvents="none"
          tint={'light'}
          intensity={50}
          style={{
            width,
            height: width,
            maxWidth: width,
            borderRadius: width / 2,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: innerWidth,
              width: innerWidth,
              aspectRatio: 1,
              borderRadius: innerWidth / 2,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RotatingIcon
              index={selectedIndex}
              data={pages.map(item => item.icon)}
              itemWidth={innerWidth}
            />
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  }
}

class GalleryButton extends React.Component {
  render() {
    const { onPress, source } = this.props;
    const size = 36;
    const enabled = !DISABLE_BOTTOM_DRAWER;
    return (
      <TouchableOpacity
        style={{ width: size, height: size }}
        pointerEvents={enabled ? 'auto' : 'none'}
        onPress={onPress}
      >
        <Image
          source={source}
          style={{
            opacity: enabled ? 1 : 0.5,
            flex: 1,
            resizeMode: 'contain',
            borderRadius: 4,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'white',
          }}
        />
      </TouchableOpacity>
    );
  }
}

class RotatingIcon extends React.Component {
  state = { index: 0 };

  componentDidMount() {
    if (this.viewPager)
      this.viewPager.scrollToIndex({
        index: this.props.index,
        animated: false,
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      if (this.viewPager) {
        this.viewPager.scrollToIndex({
          index: this.props.index,
          duration: 1000,
        });
      }
    }
  }

  renderItem = ({ item, index }) => {
    const { itemWidth } = this.props;
    const maxRotation = 80;
    const inputMargin = itemWidth * 0.333333333;
    if (!item) {
      return <View style={{ width: itemWidth }} />;
    }
    const animatedStyle = {
      width: itemWidth,
      height: itemWidth,
      padding: 4,
      transform: [
        {
          rotateY: this.animatedValue.interpolate({
            inputRange: [
              (index - 1) * itemWidth + inputMargin,
              index * itemWidth,
              (index + 1) * itemWidth - inputMargin,
            ],
            outputRange: [`-${maxRotation}deg`, '0deg', `${maxRotation}deg`],
          }),
        },
      ],
    };
    return (
      <Animated.View style={animatedStyle}>
        <Image style={{ flex: 1, resizeMode: 'contain' }} source={item} />
      </Animated.View>
    );
  };
  animatedValue = new Animated.Value(0);
  render() {
    const { itemWidth, data } = this.props;

    return (
      <ViewPager
        pagingEnabled
        useNativeDriver={Platform.OS !== 'web'}
        scroll={this.animatedValue}
        ref={ref => (this.viewPager = ref)}
        data={data}
        renderItem={this.renderItem}
        style={{
          minHeight: itemWidth,
          maxHeight: itemWidth,
          maxWidth: itemWidth,
          minWidth: itemWidth,
        }}
        size={itemWidth}
        horizontal
      />
    );
  }
}
