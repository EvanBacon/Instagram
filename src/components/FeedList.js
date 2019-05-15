import React from 'react';
import { FlatList } from 'react-native';

import { Stories } from '../constants/Posts';
import FeedListFooter from './FeedListFooter';
import Item from './Item';
import StorySlider from './StorySlider';

export const profileImageSize = 30;

export default class FeedList extends React.Component {
  static defaultProps = {
    ListHeaderComponent: props => <StorySlider stories={Stories} />,
  };
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        renderItem={({ item }) => <Item item={item} />}
        ListFooterComponent={props => <FeedListFooter {...props} onPress={onPressFooter} />}
        keyExtractor={(item, index) => item.key + ' ' + index}
        {...props}
      />
    );
  }
}
