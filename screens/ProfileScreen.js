import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import FeedDisplayRow, { DISPLAY_FORMATS } from '../components/FeedDisplayRow';
import FeedList from '../components/FeedList';
import PhotoGrid from '../components/PhotoGrid';
import ProfileBody from '../components/ProfileBody';
import ProfileHead from '../components/ProfileHead';
import ProfileImage from '../components/ProfileImage';
import StorySlider from '../components/StorySlider';
import Posts, { Highlights } from '../constants/Posts';

export class OutlineImage extends React.Component {
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
        <ProfileImage
          style={[
            {
              aspectRatio: 1,
              height: imageSize,
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
          height: imageWrapperSize,
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

export const ACCOUNT = 'baconbrix';
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Baconbrix',
  };

  state = {
    tag: DISPLAY_FORMATS[0],
  };

  componentDidMount() {
    // setTimeout(() => {
    //   NavigationService.navigate('Profile_Details', { item: posts[0] });
    // });
  }

  renderDisplay = () => {
    if (this.state.tag === DISPLAY_FORMATS[1]) {
      return <FeedList data={Posts} ListHeaderComponent={null} />;
    } else if (this.state.tag === DISPLAY_FORMATS[2]) {
      return <PhotoGrid data={[...Posts].reverse()} />;
    }
    return <PhotoGrid data={Posts} />;
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <ProfileHead />
        <ProfileBody />
        <StorySlider
          stories={Highlights.filter(({ items }) => items.length)}
          hasNew
        />
        <FeedDisplayRow
          onSelect={tag => this.setState({ tag })}
          selected={this.state.tag}
        />

        {this.renderDisplay()}
      </ScrollView>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fafafa',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
});
