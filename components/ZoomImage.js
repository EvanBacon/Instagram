import React from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';

import { calculateMaximumZoomScale, calculateRect } from './RectUtils';
import TapView from './TapView';

const { width } = Dimensions.get('window');
async function getImageSizeAsync(uri) {
  return new Promise((res, rej) =>
    Image.getSize(uri, (width, height) => res({ width, height }), rej),
  );
}
export default class ZoomImage extends React.Component {
  state = {
    uri: null,
    size: null,
    layout: null,
    maximumZoomScale: 1,
  };

  constructor(props) {
    super(props);

    (async () => {
      const { size, uri } = this.state;
      if (!size && uri) {
        const nextSize = await getImageSizeAsync(uri);
        this.setState({
          size: nextSize,
        });
      }
    })();

    this.state = {
      uri: props.uri,
      size: props.size,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (nextProps.selected != props.selected) {
      if (props.selected && !nextProps.selected) {
        this._clean = true;
        this.zoomOut(false);
      }
    }
    if (nextProps.uri != props.uri) {
      this.setState({ uri: nextProps.uri });
    }
    if (nextProps.size != props.size && nextProps.size != this.state.size) {
      this.setState({ size: nextProps.size });
    }
  }

  onLayout = ({ nativeEvent: { layout } }) => {
    if (layout != this.state.layout) {
      const { size } = this.state;
      const maximumZoomScale = calculateMaximumZoomScale(size, layout);
      this.setState({ layout, maximumZoomScale });
    }
  };

  onDoubleTap = ({ nativeEvent: { x, y } }) => {
    if (this.clean) {
      this.zoomInOnPoint({ x, y });
    } else {
      this.zoomOut();
    }
  };

  setZoomRef = node => {
    if (node) {
      this.zoomRef = node;
      this.scrollResponderRef = this.zoomRef.getScrollResponder();
    }
  };

  set clean(value) {
    if (value !== this._clean) {
      if (value) {
        this.zoomOut();
      }
    }
  }

  scrollTo = ({ x, y, width, height }, animated) =>
    this.scrollResponderRef.scrollResponderZoomTo({
      x,
      y,
      width,
      height,
      animated,
    });

  zoomOut = (animated = true) => {
    this.scrollTo({ width: 100000, height: 100000 }, animated);
  };
  zoomInOnPoint = ({ x, y }) => {
    this.scrollTo({ x, y }, true);
  };

  _clean = true;

  get clean() {
    return this._clean;
  }
  onScroll = ({ nativeEvent }) => {
    const { zoomScale } = nativeEvent;
    this._clean = zoomScale <= 1;
  };

  get imageStyle() {
    return (
      calculateRect({
        imageSize: this.state.size,
        containerSize: this.state.layout,
        resizeMode: 'contain',
      }) || {}
    );
  }

  get horizontal() {
    return (this.state.layout || {}).width > this.imageStyle.width;
  }
  render() {
    if (!this.props.size) {
      return null;
    }

    const { uri, maximumZoomScale } = this.state;
    const { style, id } = this.props;

    return (
      <TapView
        style={style}
        enabled={true}
        id={id}
        onLongPress={() => {
          console.log('long press');
        }}
        onDoubleTap={this.onDoubleTap}
        onTap={() => {
          console.log('tap');
        }}
      >
        <ScrollView
          key={id}
          scrollEnabled
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          onScroll={this.onScroll}
          ref={this.setZoomRef}
          onLayout={this.onLayout}
          style={{ flex: 1, width }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          minimumZoomScale={1}
          horizontal={this.horizontal}
          maximumZoomScale={maximumZoomScale}
          centerContent={true}
        >
          <Image
            resizeMode="contain"
            style={this.imageStyle}
            source={{ uri }}
          />
        </ScrollView>
      </TapView>
    );
  }
}
