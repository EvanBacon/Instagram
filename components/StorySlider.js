import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';

import dispatch from '../rematch/dispatch';
import ProfileImage from './ProfileImage';
import useLayout from '../useLayout';

const imagePadding = 2;
const imageBorderWidth = 2;

class OutlineImage extends React.Component {
  render() {
    const {
      style,
      source,
      renderImage,
      account,
      imageSize,
      ...props
    } = this.props;

    const imageWrapperSize = imageSize + (imagePadding + imageBorderWidth) * 2;

    let imageComponent;
    if (renderImage) {
      imageComponent = renderImage({ imageWrapperSize });
    } else {
      imageComponent = (
        <ProfileImage
          style={[
            {
              height: imageSize,
              width: imageSize,
              borderRadius: imageSize / 2,
              overflow: 'hidden',
              resizeMode: 'cover',
              backgroundColor: 'lightgray',
            },
            style,
          ]}
          account={account}
          source={source}
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
          borderColor: '#CA4074',
        }}
      >
        {imageComponent}
        <View
          style={[
            {
              position: 'absolute',
              top: imagePadding,
              right: imagePadding,
              left: imagePadding,
              bottom: imagePadding,
              borderRadius: imageWrapperSize / 2,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'rgba(0,0,0,0.0975)',
            },
          ]}
        />
      </View>
    );
  }
}

const ICON_SIZE = 56;

class StoryItem extends React.Component {
  render() {
    const { title, items, account, index, renderImage } = this.props;

    let source = undefined;
    if (!account && Array.isArray(items)) {
      source = { uri: items[0].uri };
    }

    return (
      <TouchableOpacity
        ref={ref => (this.item = ref)}
        onPress={() => {
          this.item.measure((ox, oy, width, height, px, py) => {
            let photoComponent = findNodeHandle(this.item);
            const elemRect = photoComponent.getBoundingClientRect();
            const topOffset = elemRect.top + window.scrollY;
            const leftOffset = elemRect.left + window.scrollX;

            const offset = {
              top: topOffset + ICON_SIZE / 2,
              left: leftOffset + ICON_SIZE / 2,
            };

            dispatch().stories.openCarousel({ index, offset });
          });
        }}
        style={{ alignItems: 'center', marginRight: 12 }}
      >
        <OutlineImage
          source={source}
          account={account}
          renderImage={renderImage}
          imageSize={ICON_SIZE}
        />
        <Text style={{ fontSize: 12, marginTop: 6 }}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const NewStory = () => {
  return (
    <StoryItem
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
  );
};

function Stories({ stories, hasNew }) {
  const { onLayout, width } = useLayout();

  const isLarge = width >= 600;
  return (
    <ScrollView
      horizontal
      onLayout={onLayout}
      showsHorizontalScrollIndicator={false}
      style={[
        styles.row,
        isLarge && {
          marginVertical: 24,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          backgroundColor: '#FAFAFA',

          borderWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      {hasNew && <NewStory />}
      {stories.map((story, index) => (
        <StoryItem key={story.account} {...story} index={index} />
      ))}
    </ScrollView>
  );
}

export default Stories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'transparent',
  },
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
