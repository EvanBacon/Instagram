import React from 'react';

import { Image, View } from 'react-native';
import { ItemFooter } from './ItemFooter';
import { ItemHeader } from './ItemHeader';

export class Item extends React.PureComponent {
  state = {};
  componentDidMount() {
    if (!this.props.imageWidth) {
      Image.getSize(this.props.source.uri, (width, height) => {
        this.setState({ width, height });
      });
    }
  }
  render() {
    const { imageWidth, imageHeight } = this.props;
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;
    return (
      <View>
        <ItemHeader name={this.props.author} source={this.props.source} />
        <Image
          style={{
            resizeMode: 'contain',
            aspectRatio: aspect,
            width: '100%',
          }}
          source={this.props.source}
        />
        <ItemFooter
          name={this.props.author}
          description={this.props.description}
          comments={this.props.comments}
        />
      </View>
    );
  }
}
