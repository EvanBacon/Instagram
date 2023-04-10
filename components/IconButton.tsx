import React from "react";
import { TouchableOpacity } from "react-native";

import InstaIcon from "./InstaIcon";

const iconButtonSize = 30;

export const IconButton = ({
  style,
  containerStyle,
  enabled = true,
  onPress,
  active,
  name,
}: {
  style?: any;
  containerStyle?: any;
  enabled?: boolean;
  onPress?: () => void;
  active?: boolean;
  name: string;
}) => (
  <TouchableOpacity
    disabled={!enabled}
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
