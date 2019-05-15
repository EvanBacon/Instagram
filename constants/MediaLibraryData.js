const mediaData = new Array(30).fill(0).map((i, index) => {
  const uri = 'https://picsum.photos/400/200?image=' + 10 + index;
  return {
    image: {
      uri,
    },
  };
});

export default mediaData;
