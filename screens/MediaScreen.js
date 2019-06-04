import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Square from '../components/Square';
import ZoomImage from '../components/ZoomImage';
import NavigationService from '../navigation/NavigationService';

class PhotoGridItem extends React.PureComponent {
  render() {
    const { hasMulti, onSelect } = this.props;
    return (
      <Square
        style={{
          aspectRatio: 1,
          flex: 0.25,
          marginRight: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('Details', { item: this.props });
            onSelect(this.props.source);
          }}
          activeOpacity={0.6}
          style={{ flex: 1 }}
        >
          <Image
            style={{
              resizeMode: 'cover',
              flex: 1,
            }}
            source={this.props.source}
          />
        </TouchableOpacity>

        {hasMulti && (
          <Ionicons
            style={{
              transform: [{ scaleX: -1 }],
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            name={'md-copy'}
            size={26}
            color={'white'}
          />
        )}
      </Square>
    );
  }
}

class PhotoGrid extends React.Component {
  render() {
    const { onPressFooter, onSelect, ...props } = this.props;
    return (
      <FlatList
        style={{ height: Dimensions.get('window').height - 64 }}
        numColumns={4}
        columnWrapperStyle={{
          marginHorizontal: -1,
          marginBottom: 1,
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{ marginBottom: 64 }}
        renderItem={({ item }) => (
          <PhotoGridItem onSelect={onSelect} {...item} />
        )}
        keyExtractor={(item, index) => `${index}-`}
        {...props}
      />
    );
  }
}

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // const goToAlbums = () => navigation.navigate('MediaAlbums');
    // const clearAlbumSelection = () => navigation.pop(2);
    // const { params } = navigation.state;
    // const isAlbumSet = params && params.album;

    return {
      title: 'Camera Roll',
      headerRight: (
        <View style={{ marginRight: 5 }}>
          <Button
            title="Next"
            onPress={() => {
              navigation.navigate('EditMedia');
            }}
          />
        </View>
      ),
    };
  };

  state = {
    selectedImage: posts[0].source,
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    const { selectedImage } = this.state;
    const { width } = Dimensions.get('window');
    return (
      <ScrollView
        bounces={false}
        pagingEnabled
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <ZoomImage
          size={{ width, height: width }}
          uri={selectedImage.uri}
          style={{ width: '100%', aspectRatio: 1 }}
        />

        <PhotoGrid
          data={posts}
          onSelect={post => this.setState({ selectedImage: post })}
        />
      </ScrollView>
    );
  }
}

const posts = [
  {
    key: 'a',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },
  {
    key: 'acasd',
    title: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'a',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },
  {
    key: 'acasd',
    title: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'a',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },
  {
    key: 'acasd',
    title: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'a',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },
  {
    key: 'acasd',
    title: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'a',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    account: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },
  {
    key: 'acasd',
    title: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
];
