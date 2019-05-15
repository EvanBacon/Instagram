import React from 'react';
import { Image } from 'react-native';

export default ({ account, size = 'Small', source, ...props }) => {
  let renderSource = source || { uri: `https://avatars.io/instagram/${account}/${size}` };
  return <Image source={renderSource} {...props} />;
};
