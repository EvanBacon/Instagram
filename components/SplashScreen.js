import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Square from './Square';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Square style={styles.imageWrapper}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../assets/images/splash-icon.png')}
        />
      </Square>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { flex: 1 },
  imageWrapper: { aspectRatio: 1, width: '10%', minWidth: 128 },
  container: {
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
