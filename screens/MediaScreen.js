import { ExpoConfigView } from '@expo/samples';
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Linking,
  TouchableHighlight,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

import NavigationService from '../navigation/NavigationService';
import ZoomImage from '../components/ZoomImage';

const PhotoGridIcon = ({ name }) => (
  <Ionicons
    style={{ marginHorizontal: 4 }}
    name={name}
    size={26}
    color={'black'}
  />
);

class PhotoGridItem extends React.PureComponent {
  render() {
    const { hasMulti } = this.props;
    return (
      <View
        style={{
          aspectRatio: 1,
          flex: 0.25,
          marginRight: 1,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('Details', { item: this.props })
          }
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
      </View>
    );
  }
}

class PhotoGrid extends React.Component {
  render() {
    const { onPressFooter, ...props } = this.props;
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
        renderItem={({ item }) => <PhotoGridItem {...item} />}
        keyExtractor={(item, index) => `${index}-`}
        {...props}
      />
    );
  }
}

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */

    const { width } = Dimensions.get('window');
    return (
      <ScrollView
        bounces={false}
        pagingEnabled
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <ZoomImage
          size={{ width, height: width }}
          uri={
            'https://img.buzzfeed.com/buzzfeed-static/static/2015-03/2/17/campaign_images/webdr09/24-signs-youre-the-lemongrab-of-your-friend-group-2-17097-1425335201-11_dblbig.jpg'
          }
          style={{ width: '100%', aspectRatio: 1 }}
        />

        <PhotoGrid data={posts} />
      </ScrollView>
    );
  }
}

const posts = [
  {
    key: 'a',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    author: 'baconbrix',
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
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    author: 'baconbrix',
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
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    author: 'baconbrix',
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
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    author: 'baconbrix',
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
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'b',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdb',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://m.media-amazon.com/images/M/MV5BNTE0Yzc3OTQtN2NhMS00NTdiLTlmMzAtOGRjNmQ3ZGYxN2M5XkEyXkFqcGdeQXVyMzQ3OTE4NTk@._V1_UY268_CR11,0,182,268_AL_.jpg',
    },
  },

  {
    key: 'advasd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri: 'https://i.ebayimg.com/images/g/MuwAAOSwax5YoZOp/s-l300.jpg',
    },
  },
  {
    key: 'agre',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://coubsecure-s.akamaihd.net/get/b115/p/coub/simple/cw_timeline_pic/3ad828e8989/ffa93af652a155a7911d2/big_1473465663_1382481140_image.jpg',
    },
  },
  {
    key: 'asdfsdfsd',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    source: {
      uri:
        'https://regularshowwiki.weebly.com/uploads/7/4/1/1/7411048/8617815_orig.png',
    },
  },
  {
    key: 'bsdfsge',
    author: 'baconbrix',
    description: 'enjoying a hammysammy',
    hasMulti: true,
    source: {
      uri: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
    },
  },
  {
    key: 'asdsdfb',
    author: 'baconbrix',
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
