import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import NavigationService from '../navigation/NavigationService';

const Stat = ({ title, children, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{children}</Text>
      <Text style={{ fontSize: 16, opacity: 0.8 }}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const StatsBar = ({ stats }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
    {stats.map(({ title, value, onPress }) => (
      <Stat key={title} title={title} onPress={onPress}>
        {value}
      </Stat>
    ))}
  </View>
);

class OutlineImage extends React.Component {
  render() {
    const { style, renderImage, imageSize, ...props } = this.props;

    const imagePadding = 4;
    const imageBorderWidth = 1;
    const imageWrapperSize = imageSize + (imagePadding + imageBorderWidth) * 2;

    let imageComponent;
    if (renderImage) {
      imageComponent = renderImage({ imageWrapperSize });
    } else {
      imageComponent = (
        <Image
          style={[
            {
              aspectRatio: 1,
              width: imageSize,
              borderRadius: imageSize / 2,
              overflow: 'hidden',
              resizeMode: 'cover',
              backgroundColor: 'lightgray',
            },
            style,
          ]}
          {...props}
        />
      );
    }
    return (
      <View
        style={{
          aspectRatio: 1,
          width: imageWrapperSize,
          padding: imagePadding,
          borderRadius: imageWrapperSize / 2,
          borderWidth: imageBorderWidth,
          borderColor: 'rgba(0,0,0,0.3)',
        }}
      >
        {imageComponent}
      </View>
    );
  }
}

const EditButton = () => (
  <TouchableHighlight>
    <View
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        marginHorizontal: 8,
        marginVertical: 8,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '500' }}>Edit</Text>
    </View>
  </TouchableHighlight>
);

class ProfileHead extends React.Component {
  render() {
    const stats = [
      {
        title: 'posts',
        value: '4k',
        onPress: () => {
          //TODO: Bacon: Scroll down
        },
      },
      {
        title: 'following',
        value: '72k',
        onPress: () =>
          NavigationService.navigate('Profile_Following', { users: [] }),
      },
      {
        title: 'followers',
        value: '1M',
        onPress: () =>
          NavigationService.navigate('Profile_Followers', { users: [] }),
      },
    ];

    return (
      <View style={styles.row}>
        <OutlineImage
          source={{
            uri: 'http://i.imgur.com/hFcXLvG.jpg',
          }}
          imageSize={96}
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}
        >
          <StatsBar stats={stats} />
          <EditButton />
        </View>
      </View>
    );
  }
}

const ProfileBody = () => (
  <View
    style={{
      paddingHorizontal: 12,
    }}
  >
    <Text style={{ fontSize: 16, marginBottom: 4, fontWeight: '500' }}>
      Danny Boiiii
    </Text>
    <Text style={{ fontSize: 16 }}>
      Self-taught #JavaScript developer 🎨 #Lego Master Builder I do stuff with
      💙 Expo, #ReactNative, firebase, arkit, and #3dmodeling 🏠 #Austin 🔥 Bay
      Area
    </Text>
    <Text
      style={{
        fontSize: 16,
        color: '#003569',
        marginBottom: 4,
        fontWeight: '500',
      }}
      onPress={() => Linking.openURL('https://www.github.com/evanbacon')}
    >
      github.com/evanbacon
    </Text>
  </View>
);

const Story = ({ title, source, renderImage }) => (
  <View style={{ alignItems: 'center', marginRight: 12 }}>
    <OutlineImage source={source} renderImage={renderImage} imageSize={72} />
    <Text style={{ fontSize: 16, marginTop: 6 }}>{title}</Text>
  </View>
);
const Stories = ({ stories }) => (
  <ScrollView horizontal style={styles.row}>
    <Story
      title="new"
      renderImage={() => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: 4,
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-add" size={48} />
        </View>
      )}
    />
    {stories.map(story => (
      <Story {...story} />
    ))}
  </ScrollView>
);

const FormatButton = ({ icon, onPress, selected }) => (
  <TouchableHighlight onPress={onPress} style={{ flex: 1 }}>
    <View
      style={{
        flex: 1,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Ionicons
        size={32}
        color={selected ? '#003569' : 'rgba(0,0,0,0.5)'}
        name={icon}
      />
    </View>
  </TouchableHighlight>
);

const FormatRow = () => (
  <View
    style={[
      styles.row,
      {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0,0,0,0.3)',
        height: 48,
      },
    ]}
  >
    <FormatButton icon="md-grid" selected />
    <FormatButton icon="md-apps" />
    <FormatButton icon="md-barcode" />
  </View>
);

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
          flex: 0.333,
          marginRight: 1,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('Profile_Details', { item: this.props })
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
        numColumns={3}
        columnWrapperStyle={{
          marginHorizontal: -1,
          marginBottom: 1,
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{ marginBottom: 64 }}
        renderItem={({ item }) => <PhotoGridItem {...item} />}
        keyExtractor={item => item.key}
        {...props}
      />
    );
  }
}

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Baconbrix',
  };

  componentDidMount() {
    // setTimeout(() => {
    //   NavigationService.navigate('Details', this.props);
    // });
  }
  render() {
    const stories = [
      {
        key: 'a',
        source: {
          uri:
            'https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/rigby-regular-show-the-movie-59.jpg',
        },
        title: 'Code',
      },
      {
        key: 'b',
        source: {
          uri:
            'https://vignette.wikia.nocookie.net/theregularshow/images/c/c6/D1.png/revision/latest?cb=20111210030233',
        },
        title: 'Hair',
      },
      {
        key: 'c',
        source: {
          uri:
            'https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/mordecai-regular-show-9.39.jpg',
        },
        title: 'Kixx',
      },
    ];

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
    ];
    return (
      <ScrollView style={styles.container}>
        <ProfileHead />
        <ProfileBody />
        <Stories stories={stories} />
        <FormatRow />
        <PhotoGrid data={posts} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
});
