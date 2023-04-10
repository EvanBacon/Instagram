import Popular from "@/data/Popular-itunes.json";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Audio } from "expo-av";
import * as React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const listItemImageSize = 56;
const ListScreenItem = ({
  renderImage,
  title,
  subtitle,
  renderAction,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 8,
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {renderImage({
        style: {
          shadowOpacity: 0.4,
          shadowRadius: 6,
          width: listItemImageSize,
          height: listItemImageSize,
          borderRadius: 5,
          backgroundColor: "gray",
        },
      })}
      <View
        style={{
          justifyContent: "space-between",
          marginLeft: 12,
          maxWidth: "80%",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{ marginTop: 4, color: "white", opacity: 0.7, fontSize: 14 }}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    {renderAction()}
  </TouchableOpacity>
);

const SongListScreenItem = ({ title, artist, image, onPress }) => (
  <ListScreenItem
    onPress={onPress}
    renderImage={({ style }) => (
      <Image loading="lazy" style={style} resizeMode="cover" source={image} />
    )}
    title={title}
    subtitle={artist}
    renderAction={() => <PlayButtonIcon />}
  />
);
const USE_REMOTE_IMAGES = process.env.NODE_ENV === "production";

const GenreListScreenItem = ({ genre, image, onPress }) => (
  <ListScreenItem
    onPress={onPress}
    renderImage={({ style }) => (
      <View style={StyleSheet.flatten([style, { padding: 12 }])}>
        <Image
          style={{ flex: 1, tintColor: "white" }}
          resizeMode={"contain"}
          source={image}
        />
      </View>
    )}
    title={genre}
    renderAction={() => <ChevronRight />}
  />
);

const ListScreen = ({ onPress, ...props }) => (
  <FlatList
    keyExtractor={(o, i) => i + "--"}
    style={{ flex: 1 }}
    contentContainerStyle={{ paddingBottom: 60 }}
    {...props}
    renderItem={({ item }) => {
      if (item.genre) {
        return (
          <GenreListScreenItem
            onPress={() => {
              props.navigation.navigate("MusicScreen", { item });
            }}
            {...item}
          />
        );
      }
      return (
        <SongListScreenItem
          onPress={() => {
            playSongAsync(item);
          }}
          {...item}
        />
      );
    }}
  />
);

let playingAudio;
async function playSongAsync({ audio }) {
  if (playingAudio) {
    await playingAudio.pauseAsync();
  }

  playingAudio = new Audio.Sound();
  try {
    await playingAudio.loadAsync(
      { uri: audio },
      { progressUpdateIntervalMillis: 100 }
    );
    await playingAudio.playAsync();
    //   soundObject.setOnPlaybackStatusUpdate(this._updateStateToStatus);
    //   const status = await soundObject.getStatusAsync();
    //   this._updateStateToStatus(status);
    //   this._sound = soundObject;
  } catch (error) {
    alert(error.message);
    // this.setState({ errorMessage: error.message });
  }
}
function transformSongList(list) {
  return list
    .filter(({ trackName }) => trackName)
    .map((song) => {
      return {
        title: song.trackName,
        artist: song.artistName,
        isExplict: song.trackExplicitness === "explicit",
        duration: song.trackTimeMillis,
        audio: song.previewUrl,
        image: {
          uri: USE_REMOTE_IMAGES
            ? song.artworkUrl60
            : "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F09%2Flil-yachty-mtv-how-high-2-movie-0.jpg?q=75&w=800&cbr=1&fit=max",
        },
      };
    });
}
const Songs = transformSongList(Popular.splice(0, 10));

const PopularScreen = (props) => <ListScreen {...props} data={Songs} />;

export default PopularScreen;

const PlayButtonIcon = (props) => (
  <EvilIcons name="play" color={"rgba(255,255,255,0.7)"} size={36} {...props} />
);
const ChevronRight = (props) => (
  <EvilIcons
    name="chevron-right"
    color={"rgba(255,255,255,0.7)"}
    size={36}
    {...props}
  />
);
