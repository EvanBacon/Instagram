const ACCOUNT = 'baconbrix';

const COMMENTS = [
  {
    account: 'jameside',
    isLiked: true,
    date: '2w',
    title: 'Wow cool!',
  },
  {
    account: 'ccheever',
    isLiked: false,
    date: '2w',
    title: 'Seems reasonable 😉',
  },
  {
    account: 'notbrent',
    isLiked: true,
    date: '3w',
    title: `React Navigation is born from the React Native community's need for an extensible yet easy-to-use navigation solution written entirely in JavaScript (so you can read and understand all of the source), on top of powerful native primitives.`,
  },
].map(transformComment);

function transformComment({ ...item }) {
  return {
    ...item,
  };
}

const posts = [
  {
    description: 'Being an @expo.io developer is lit 😍🔥💙',
    image: `https://scontent-sjc3-1.cdninstagram.com/vp/0ea7ffb0370dddfadd528a8b1b516573/5D186640/t51.2885-15/e35/45460185_782185418780650_4154679091114957131_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com`,
  },
  {
    description: 'New selfie, might take it down, idk, give me likes',
    image: `https://scontent-sjc3-1.cdninstagram.com/vp/38bfcc8b1412fe6e9eacf269def89ba5/5D0F993A/t51.2885-15/sh0.08/e35/c0.78.1080.1080/s640x640/50824531_117448239345934_8589191116386787248_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com`,
  },
  {
    description: 'Being a 21-year-old @expo.io developer is lit 😍🔥💙',
    image: `https://scontent-sjc3-1.cdninstagram.com/vp/f939678f172bbb08daec6cfe8f6c0aa1/5D4F31EB/t51.2885-15/sh0.08/e35/s640x640/44588924_315715379251262_8214353241920829455_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com`,
  },
  {
    description: 'enjoying a hammysammy',
    hasMulti: true,
    image: 'https://i.ytimg.com/vi/iSTUfJjtEOY/maxresdefault.jpg',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
  {
    description: 'enjoying a hammysammy',
  },
].map((item, index) => ({
  account: ACCOUNT,
  source: {
    uri: item.image || 'https://picsum.photos/200?image=' + 4 + (index % 7),
  },
  comments: COMMENTS,
  ...item,
}));

export default posts;

const Highlights = [
  {
    title: 'Expo',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TZR2DHPXLS.jpg', type: 'img' },
    ],
  },
  {
    title: 'Hair',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TXGQ76N3J0.jpg', type: 'img' },
    ],
  },
  {
    title: 'Stickers 👟',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/DJQQTMR8XV.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/XLYI8D8H5R.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8N1P2AHD0W.jpg', type: 'img' },
    ],
  },
];

const Stories = [
  {
    title: 'Your Story',
    account: ACCOUNT,
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/DJQQTMR8XV.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/XLYI8D8H5R.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8N1P2AHD0W.jpg', type: 'img' },
    ],
  },
  {
    title: 'ccheever',
    account: 'ccheever',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TXGQ76N3J0.jpg', type: 'img' },
    ],
  },
  {
    title: 'jameside',
    account: 'jameside',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TZR2DHPXLS.jpg', type: 'img' },
    ],
  },
  {
    title: 'notbrent',
    account: 'notbrent',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/FC9HYIWC9B.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8BY0ULY9GK.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/SFJPODPJY4.jpg', type: 'img' },
    ],
  },
  {
    title: 'quinlanjung',
    account: 'quinlanjung',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TPZVAKR2HA.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/WY4HT9B3QJ.jpg', type: 'img' },
    ],
  },
  {
    title: 'tzhongg',
    account: 'tzhongg',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/R16PYWVG7N.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TXGQ76N3J0.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/5ECBT47XF5.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/95U1U3BR0Y.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/T6J8OZBM38.jpg', type: 'img' },
    ],
  },
  {
    title: 'i_am_nader',
    account: 'i_am_nader',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OQ47D2T5AP.jpg', type: 'img' },
    ],
  },
  {
    title: 'theavocoder',
    account: 'theavocoder',
    items: [
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/XG1ASVK8BU.jpg', type: 'img' },
      { uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/R7992YD801.jpg', type: 'img' },
    ],
  },
];
export { Stories, Highlights };
