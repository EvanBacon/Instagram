import React, { PureComponent } from 'react';
import { Text, FlatList, StyleSheet, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Footer extends PureComponent {
  render() {
    return (
      <View>
        <Text onPress={this.props.onPress}>Load More...</Text>
      </View>
    );
  }
}

const profileImageSize = 48;

const ItemHeader = ({ name, location, image }) => (
  <View
    style={{
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 6,
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={{
          aspectRatio: 1,
          backgroundColor: '#d8d8d8',
          borderWidth: StyleSheet.hairlineWidth,
          width: profileImageSize,
          borderRadius: profileImageSize / 2,
          marginRight: 12,
          resizeMode: 'cover',
        }}
        source={{ uri: image }}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ fontSize: 16, opacity: 0.8 }}>
          {location || 'Legoland'}
        </Text>
      </View>
    </View>
    <Icon name="ios-more" />
  </View>
);

const ItemFooter = ({ name, description }) => (
  <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
    <IconBar />
    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
    <Text>{description}</Text>
  </View>
);

const IconBar = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row' }}>
      <Icon name="ios-heart-outline" />
      <Icon name="ios-chatbubbles-outline" />
      <Icon name="ios-send-outline" />
    </View>
    <Icon name="ios-bookmark-outline" />
  </View>
);

const Icon = ({ name }) => (
  <Ionicons
    style={{ marginHorizontal: 4 }}
    name={name}
    size={26}
    color={'black'}
  />
);

class Item extends PureComponent {
  state = {};

  componentDidMount() {
    if (!this.props.imageWidth) {
      Image.getSize(this.props.image, (width, height) => {
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
        <ItemHeader name={this.props.author} image={this.props.image} />
        <Image
          style={{
            resizeMode: 'contain',
            aspectRatio: aspect,
            width: '100%',
          }}
          source={{ uri: this.props.image }}
        />
        <ItemFooter
          name={this.props.author}
          description={this.props.description}
        />
      </View>
    );
  }
}

export default class FeedList extends React.Component {
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        renderItem={({ item }) => <Item {...item} />}
        ListFooterComponent={props => (
          <Footer {...props} onPress={onPressFooter} />
        )}
        keyExtractor={item => item.key}
        {...props}
      />
    );
  }
}
