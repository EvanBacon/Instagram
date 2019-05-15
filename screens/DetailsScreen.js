import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Item from '../components/Item';

export default class DetailsScreen extends React.Component {
  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <ScrollView style={styles.container}>
        <Item item={item} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
