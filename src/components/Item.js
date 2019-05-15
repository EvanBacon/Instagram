import React from 'react';
import { View } from 'react-native';

import ItemFooter from './ItemFooter';
import ItemHeader from './ItemHeader';
import ItemImage from './ItemImage';

class Item extends React.PureComponent {
  render() {
    const { imageWidth, imageHeight, item } = this.props;
    return (
      <View>
        <ItemHeader item={item} />
        <ItemImage imageWidth={imageWidth} imageHeight={imageHeight} source={item.source} />
        <ItemFooter item={item} />
      </View>
    );
  }
}
export default Item;
