import React from 'react';

export default function useBasicQuery() {
  const [size, setLayout] = React.useState();
  const onLayout = React.useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      if (width < 480) setLayout(0);
      else if (width < 768) setLayout(1);
      else if (width < 992) setLayout(2);
      else setLayout(3);
    },
    [],
  );

  return [onLayout, size];
}
