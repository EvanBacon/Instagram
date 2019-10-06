import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import dispatch from '../../rematch/dispatch';
import Indicator from './Indicator';

// import Image from 'react-native-image-progress';
// import CircleSnail from 'react-native-progress/CircleSnail';

// indicator={CircleSnail}

const ENABLE_TOUCHABLES = true;

const circleSnailProps = { thickness: 1, color: '#ddd', size: 80 };
const { width, height } = Dimensions.get('window');

class Story extends React.Component {
  render() {
    const { story } = this.props;

    if (!ENABLE_TOUCHABLES) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={story.items[story.idx]}
            style={styles.deck}
            indicatorProps={circleSnailProps}
          />
          {this.renderIndicators()}
          {this.renderCloseButton()}
          {this.renderBackButton()}
        </View>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch().stories.onNextItem();
        }}
        delayPressIn={200}
        onPressIn={() => {
          dispatch().stories.pause();
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={story.items[story.idx]}
            style={styles.deck}
            indicatorProps={circleSnailProps}
          />
          {this.renderIndicators()}
          {this.renderCloseButton()}
          {this.renderBackButton()}
        </View>
      </TouchableOpacity>
    );
  }

  renderCloseButton() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch().stories.dismissCarousel();
        }}
      >
        <View style={styles.closeButton}>
          <View
            style={[styles.closeCross, { transform: [{ rotate: '45deg' }] }]}
          />
          <View
            style={[styles.closeCross, { transform: [{ rotate: '-45deg' }] }]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderIndicators() {
    const { story, currentDeck } = this.props;

    return (
      <View style={styles.indicatorWrap}>
        <LinearGradient
          colors={['rgba(0,0,0,0.33)', 'transparent']}
          locations={[0, 0.95]}
          style={styles.indicatorBg}
        />

        <View style={styles.indicators}>
          {story.items.map((item, i) => (
            <Indicator
              key={i}
              i={i}
              animate={currentDeck && story.idx == i}
              story={story}
            />
          ))}
        </View>
      </View>
    );
  }

  renderBackButton() {
    const { backOpacity } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch().stories.onPrevItem();
        }}
        onPressIn={() => dispatch().stories.setBackOpacity(1)}
        onLongPress={() => dispatch().stories.setBackOpacity(0)}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.33)', 'transparent']}
          locations={[0, 0.85]}
          start={[0, 0]}
          end={[1, 0]}
          style={[
            styles.back,
            {
              opacity: backOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(({ stories }) => ({ ...stories }))(Story);

const styles = StyleSheet.create({
  deck: {
    width,
    height,
    backgroundColor: 'black',
  },

  progressIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  indicatorWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  indicators: {
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  indicatorBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },

  back: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 90,
  },

  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 70,
    height: 70,
    zIndex: 1,
  },
  closeCross: {
    position: 'absolute',
    top: 32,
    right: 8,
    width: 20,
    height: 1,
    backgroundColor: '#fff',
  },
});
