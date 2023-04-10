import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

import FeedDisplayRow, { DISPLAY_FORMATS } from "@/components/FeedDisplayRow";
import FeedList from "@/components/FeedList";
import PhotoGrid from "@/components/PhotoGrid";
import ProfileBody from "@/components/ProfileBody";
import ProfileHead from "@/components/ProfileHead";
import { ProfileImage } from "@/components/ProfileImage";
import StorySlider from "@/components/StorySlider";
import Posts, { Highlights } from "@/constants/Posts";

interface OutlineImageProps {
  style?: StyleProp<ViewStyle>;
  renderImage?: ({
    imageWrapperSize,
  }: {
    imageWrapperSize: number;
  }) => React.ReactNode;
  imageSize: number;
}

export const OutlineImage: React.FC<OutlineImageProps> = ({
  style,
  renderImage,
  imageSize,
  ...props
}) => {
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
            overflow: "hidden",
            resizeMode: "cover",
            backgroundColor: "lightgray",
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
        borderColor: "rgba(0,0,0,0.3)",
      }}
    >
      {imageComponent}
    </View>
  );
};

export const ACCOUNT = "baconbrix";

const ProfileScreen: React.FC = () => {
  const [tag, setTag] = useState(DISPLAY_FORMATS[0]);

  useEffect(() => {
    // setTimeout(() => {
    //   NavigationService.navigate('Profile_Details', { item: posts[0] });
    // });
  }, []);

  const renderDisplay = () => {
    if (tag === DISPLAY_FORMATS[1]) {
      return <FeedList data={Posts} ListHeaderComponent={null} />;
    } else if (tag === DISPLAY_FORMATS[2]) {
      return <PhotoGrid data={[...Posts].reverse()} />;
    }
    return <PhotoGrid data={Posts} />;
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHead />
      <ProfileBody />
      <StorySlider
        stories={Highlights.filter(({ items }) => items.length)}
        hasNew
      />
      <FeedDisplayRow onSelect={setTag} selected={tag} />

      {renderDisplay()}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fafafa",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 12,
  },
});
