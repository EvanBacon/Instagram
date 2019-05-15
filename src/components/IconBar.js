import React from 'react';
import { View } from 'react-native';

import InstaIcon from './InstaIcon';
import LikeButton from './LikeButton';

export default class IconBar extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', height: 36, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <LikeButton size={36} />
          <Icon name="chat" />
          <Icon name="send" />
        </View>
        <Icon name="bookmark" />
      </View>
    );
  }
}
export const Icon = ({ name }) => <InstaIcon size={36} name={name} color={'black'} />;
