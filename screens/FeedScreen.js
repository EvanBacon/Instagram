import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import FeedList from '../components/FeedList';
import Posts from '../constants/Posts';
import useBasicQuery from '../useBasicQuery';
import useLayout from '../useLayout';
import dispatch from '../rematch/dispatch';
import SplashScreen from '../components/SplashScreen';

export default function HomeScreen() {
  const { onLayout, width } = useLayout();
  const [isShowingSplashScreen, setShowingSplash] = React.useState(true);
  let lastWidth = NaN;
  React.useEffect(() => {
    if (width != null && width !== lastWidth) {
      lastWidth = width;
      setShowingSplash(false);
    }
  }, [width]);

  const isLarge = width >= 600;

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: isLarge ? 'center' : 'stretch',
        }}
        style={{
          backgroundColor: 'rgb(250,250,250)',
          flex: 1,
        }}
      >
        <FeedList isLarge={isLarge} style={styles.container} data={Posts} />
        {isShowingSplashScreen && <SplashScreen />}
      </ScrollView>
    </View>
  );
}
HomeScreen.navigationOptions = {
  title: 'Instagram',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 600,

    backgroundColor: 'transparent',
  },
});
