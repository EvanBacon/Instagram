import React from 'react';
import { TouchableOpacity } from 'react-native';

import InstaIcon from './InstaIcon';

// import Popular from './data/Popular.json';

const iconButtonSize = 30;

const IconButton = ({
  style,
  containerStyle,
  enabled = true,
  onPress,
  active,
  name,
  size,
  color,
}) => (
  <TouchableOpacity
    pointerEvents={enabled ? 'auto' : 'none'}
    style={[containerStyle, { width: iconButtonSize, height: iconButtonSize }]}
    onPress={onPress}
  >
    <InstaIcon
      style={[style, { opacity: enabled ? 1 : 0.7 }]}
      active={active}
      name={name}
    />
  </TouchableOpacity>
);

export default IconButton;
