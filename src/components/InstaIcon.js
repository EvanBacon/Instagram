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
        tintColor: color,
        flex: size === undefined ? 1 : undefined,
      },
      style,
    ];

    let icon = Assets.icons[name + '.png'];
    if (active && Assets.icons[name + '-on' + '.png']) {
      icon = Assets.icons[name + '-on' + '.png'];
    } else if (Assets.icons[name + '-off' + '.png']) {
      icon = Assets.icons[name + '-off' + '.png'];
    }
    return <Image source={icon} style={colorStyle} {...props} />;
  }
}
