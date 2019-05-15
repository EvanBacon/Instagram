import React from 'react';
import { Image, Dimensions } from 'react-native';

class ItemImage extends React.PureComponent {
  state = {
    width: undefined,
    height: undefined,
    isLoaded: false,
  };
  componentDidMount() {
    if (!this.props.imageWidth) {
      Image.getSize(this.props.source.uri, (width, height) => {
        this.setState({ width, height, isLoaded: true });
      });
    }
  }
  render() {
    const { imageWidth, imageHeight, source } = this.props;
    const fullWidth = Dimensions.get('window').width;
    const imgW = imageWidth || this.state.width || fullWidth;
    const imgH = imageHeight || this.state.height || imgW;
    const aspectRatio = imgH / imgW;
    const adjustedHeight = fullWidth * aspectRatio;
    return (
      <Image
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