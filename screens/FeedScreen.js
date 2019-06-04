import React from 'react';
import { StyleSheet } from 'react-native';

import FeedList from '../components/FeedList';
import Posts from '../constants/Posts';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Instagram',
  };

  render() {
    return <FeedList style={styles.container} data={Posts} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
