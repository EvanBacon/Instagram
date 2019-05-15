import React from 'react';

import { SearchBar } from 'react-native-elements';

export default ({ onClear, inputStyle, containerStyle, ...props }) => (
  <SearchBar
    round
    containerStyle={[{ backgroundColor: 'transparent', borderBottomWidth: 0 }, containerStyle]}
    inputStyle={[{ backgroundColor: 'transparent', outlineStyle: 'none' }, inputStyle]}
    {...props}
  />
);
