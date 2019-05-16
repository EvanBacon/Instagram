import React from 'react';
import { Image, Dimensions } from 'react-native';

class ItemImage extends React.PureComponent {
  state = {
    imgWidth: undefined,
    imgHeight: undefined,
    isLoaded: false,
  };
  componentDidMount() {
    if (!this.props.imageWidth) {
      Image.getSize(this.props.source.uri, (imgWidth, imgHeight) => {
        this.setState({ imgWidth, imgHeight, isLoaded: true });
      });
    }
  }
  resize = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    this.setState({ width, height, isLoaded: true });
  };

  render() {
    const { imageWidth, imageHeight, source } = this.props;
    const fullWidth = this.state.width || Dimensions.get('window').width;
    const imgW = imageWidth || this.state.imgWidth || fullWidth;
    const imgH = imageHeight || this.state.imgHeight || imgW;
    const aspectRatio = imgH / imgW;
    const adjustedHeight = fullWidth * aspectRatio;
    return (
      <Image
        onLayout={this.resize}
        style={{
          resizeMode: 'contain',
          height: adjustedHeight,
          width: '100%',
          opacity: this.state.isLoaded ? 1 : 0,
        }}
        source={source}
      />
    );
  }
}

export default ItemImage;
