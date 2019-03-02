export function calculateMaximumZoomScale(imageSize, { width, height }) {
  if (!width || width <= 0 || !height || height <= 0) {
    console.error('invalid dimensions!', width, height);
    return;
  }
  if (!imageSize) {
    console.warn('size not ready yet!');
    return;
  }
  const zoom = Math.max(
    2,
    Math.max(imageSize.width / width, imageSize.height / height),
  );
  return zoom;
}

export function calculateRect({ imageSize, containerSize, resizeMode }) {
  if (!imageSize || !containerSize) {
    // console.warn('imageSize or containerSize not ready yet!');
    return;
  }
  const { width, height } = containerSize;

  switch (resizeMode) {
    case 'contain': {
      return fitRectIntoBounds(
        { x: 0, y: 0, ...imageSize },
        { x: 0, y: 0, ...containerSize },
      );
    }
    case 'cover': {
      const widthRatio = width / imageSize.width;
      const heightRatio = height / imageSize.height;

      const ratio = Math.max(widthRatio, heightRatio);
      return {
        x: 0,
        y: 0,
        width: imageSize.width * ratio,
        height: imageSize.height * ratio,
      };
    }
  }
}

function fitRectIntoBounds(rect, bounds) {
  const rectRatio = rect.width / rect.height;
  const boundsRatio = bounds.width / bounds.height;

  let newDimensions = {};

  // Rect is more landscape than bounds - fit to width
  if (rectRatio > boundsRatio) {
    newDimensions.width = bounds.width;
    newDimensions.height = rect.height * (bounds.width / rect.width);
  } else {
    // Rect is more portrait than bounds - fit to height
    newDimensions.width = rect.width * (bounds.height / rect.height);
    newDimensions.height = bounds.height;
  }

  return newDimensions;
}
