import React from 'react';
import { Image } from 'react-native';

export default ({ account, size = 'Small', source, ...props }) => {
  const renderSource = source || {
    uri: `https://avatars.io/twitter/${account}/${size}`,
  };
  // TODO: Bacon: Instagram seems broken
  // let renderSource = source || { uri: `https://avatars.io/instagram/${account}/${size}` };
  return <Image source={renderSource} {...props} />;
};
