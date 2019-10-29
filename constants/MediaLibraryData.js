const mediaData = new Array(15).fill(0).map((i, index) => {
  const uri = 'https://picsum.photos/400/200?image=' + 5 + index;
  return {
    image: {
      uri,
    },
  };
});

export default mediaData;
