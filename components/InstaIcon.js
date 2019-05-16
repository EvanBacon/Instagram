import React from 'react';
import { Image } from 'react-native';

import Assets from '../Assets';

export default class InstaIcon extends React.PureComponent {
  render() {
    const { name, active, size, color = 'white', style, ...props } = this.props;
    if (!name) {
      return null;
    }
    const colorStyle = [
      {
        width: size,
        height: size,
        resizeMode: 'contain',
        // tintColor: color,
        flex: size === undefined ? 1 : undefined,
      },
      style,
    ];

    let icon = Assets.icons[color][name + '.png'];
    if (active && Assets.icons[color][name + '-on' + '.png']) {
      icon = Assets.icons[color][name + '-on' + '.png'];
    } else if (Assets.icons[color][name + '-off' + '.png']) {
      icon = Assets.icons[color][name + '-off' + '.png'];
    }
    return <Image source={icon} style={colorStyle} {...props} />;
  }
}
