import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

import ViewPager from './ViewPager';

const HORIZONTAL_ITEM_WIDTH = 95;
// const width = HORIZONTAL_ITEM_WIDTH;
// const HORIZONTAL_ITEM_END_SPACE = (width - HORIZONTAL_ITEM_WIDTH) / 2;
const sliderHeight = 60;
export default class Slider extends React.Component {
  state = { index: 0 };

  get currentPage() {
    return this.pages[this.viewPager.index];
  }

  previous = () => {
    if (this.viewPager) {
      this.viewPager.previous();
    }
  };

  next = () => {
    if (this.viewPager) {
      this.viewPager.next();
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp, false);
  }

  onKeyUp = e => {
    const keyMap = {
      ArrowLeft: 'LEFT',
      KeyA: 'LEFT',
      ArrowRight: 'RIGHT',
      KeyD: 'RIGHT',
    };

    const direction = keyMap[e.code];
    if (direction) {
      e.preventDefault();
      this.props.onSwipe(direction);
      if (direction === 'LEFT') {
        this.next();
      } else if (direction === 'RIGHT') {
        this.previous();
      }
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);

    this.viewPager = null;
  }

  renderItem = ({ item, index }) => {
    // const marginLeft = index === 0 ? HORIZONTAL_ITEM_END_SPACE : 0;
    // const marginRight = index === pages.length - 1 ? HORIZONTAL_ITEM_END_SPACE : 0;
    return (
      <View
        style={{
          width: this.props.window.width,
          height: sliderHeight,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: 'white',
            textAlign: 'center',
            userSelect: 'none',
          }}
          key={item}
        >
          {item}
        </Text>
      </View>
    );
  };
  render() {
    const isLarge = ['music', 'live'].includes(this.props.page.id);
    return (
      <View style={{ flex: 1, maxHeight: sliderHeight }}>
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', isLarge ? 'black' : 'rgba(0,0,0,0.3)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: isLarge ? sliderHeight * 2 : sliderHeight,
          }}
        />
        <ViewPager
          pagingEnabled
          centerContent
          initialIndex={this.props.initialIndex}
          onScrollEndDrag={() => {
            // // TODO: Bacon: PR this method into RNWeb
            // if (!this.viewPager) {
            //   return;
            // }
            // const { index } = this.viewPager;
            // if (this.state.index !== index) {
            //   this.props.onIndexChange(index, this.state.index);
            //   this.setState({ index });
            // }
          }}
          onScroll={({ value }) => {
            if (!this.viewPager) {
              return;
            }
            const { index } = this.viewPager;
            if (this.state.index !== index) {
              this.setState({ index }, () => {
                this.props.onIndexChange(index, this.state.index);
              });
            }
          }}
          ref={ref => (this.viewPager = ref)}
          data={this.props.data}
          renderItem={this.renderItem}
          style={{ flex: 1 }}
          size={this.props.window.width}
          horizontal
        />
      </View>
    );
  }
}
