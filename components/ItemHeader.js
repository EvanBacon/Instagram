import { connectActionSheet } from '@expo/react-native-action-sheet';
import React from 'react';
import { Text, View } from 'react-native';

import InstaHeaderButton from './InstaHeaderButton';
import { profileImageSize } from './FeedList';
import ProfileImage from './ProfileImage';

class ItemHeader extends React.Component {
  render() {
    const { item } = this.props;
    const { account, location } = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 16,
          paddingRight: 4,
          paddingVertical: 14,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ProfileImage
            style={{
              aspectRatio: 1,
              minHeight: profileImageSize,
              height: profileImageSize,
              backgroundColor: '#d8d8d8',
              width: profileImageSize,
              borderRadius: profileImageSize / 2,
              marginRight: 12,
              resizeMode: 'cover',
            }}
            account={account}
          />
          <View>
            <Text style={{ fontSize: 14, color: '#262626', fontWeight: '600' }}>
              {account}
            </Text>
            <Text style={{ fontSize: 12, color: '#262626' }}>
              {location || 'Legoland'}
            </Text>
          </View>
        </View>
        <InstaHeaderButton
          name="more"
          size={30}
          color={'black'}
          onPress={() => {
            const options = [
              'Copy Link',
              'Turn On Post Notifications',
              'Report',
              'Mute',
              'Unfollow',
              'Cancel',
            ];
            // TODO: Bacon: Add more destructive options
            const destructiveButtonIndex = options.length - 2;
            const cancelButtonIndex = options.length - 1;

            this.props.showActionSheetWithOptions(
              {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
                // title,
                // message,
                // icons, // Android only
                // tintIcons: true, // Android only; default is true
                // showSeparators: withSeparators, // Affects Android only; default is false
                // textStyle, // Android only
                // titleTextStyle, // Android only
                // messageTextStyle, // Android only
              },
              buttonIndex => {
                // Do something here depending on the button index selected
                // onSelection(buttonIndex);
              },
            );
          }}
        />
      </View>
    );
  }
}

export default connectActionSheet(ItemHeader);
