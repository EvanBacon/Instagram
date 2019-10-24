import React from 'react';

export default function useLayout() {
  const [layout, setLayout] = React.useState({
    x: null,
    y: null,
    width: null,
    height: null,
  });
  const onLayout = React.useCallback(e => setLayout(e.nativeEvent.layout), []);

  return {
    onLayout,
    ...layout,
  };
}
