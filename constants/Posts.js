const ACCOUNT = "baconbrix";

const COMMENTS = [
  {
    account: "jameside",
    isLiked: true,
    date: "2w",
    title: "Wow cool!",
  },
  {
    account: "ccheever",
    isLiked: false,
    date: "2w",
    title: "Seems reasonable 😉",
  },
  {
    account: "notbrent",
    isLiked: true,
    date: "3w",
    title: `React Navigation is born from the React Native community's need for an extensible yet easy-to-use navigation solution written entirely in JavaScript (so you can read and understand all of the source), on top of powerful native primitives.`,
  },
].map(transformComment);

function transformComment({ ...item }) {
  return {
    ...item,
  };
}

const IMAGES = {
  notbrent: "https://avatars0.githubusercontent.com/u/90494?s=460&v=4",
  baconbrix: "/profile/baconbrix.jpeg",
  ccheever: "https://avatars1.githubusercontent.com/u/56719?s=460&v=4",
  jameside: "/profile/jameside.jpeg",
  theavocoder: "https://avatars0.githubusercontent.com/u/29451794?s=460&v=4",
};

const posts = [
  {
    description: "Being an @expo.io developer is lit 😍🔥💙",
    image: `https://live.staticflickr.com/5524/14637340355_e3b2f4d2bc_h.jpg`,
  },
  {
    description: "New selfie, might take it down, idk, give me likes",
    image: `https://live.staticflickr.com/5528/14450721698_2831bd25a6_h.jpg`,
  },
  {
    description: "Being a 21-year-old @expo.io developer is lit 😍🔥💙",
    image: `https://www.austinchronicle.com/binary/a632/bb_evan_bacon-7328_copy.jpg`,
  },
  {
    description: "enjoying a hammysammy",
    hasMulti: true,
    image: "https://cdn.trendhunterstatic.com/thumbs/evan-bacon.jpeg",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
  {
    description: "enjoying a hammysammy",
  },
].map((item, index) => ({
  account: ACCOUNT,
  source: {
    uri: item.image || "https://picsum.photos/200?image=" + 4 + (index % 7),
  },
  comments: COMMENTS,
  ...item,
}));

export default posts;

const Highlights = [
  {
    title: "Expo",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TZR2DHPXLS.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "Hair",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TXGQ76N3J0.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "Stickers 👟",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/DJQQTMR8XV.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/XLYI8D8H5R.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8N1P2AHD0W.jpg",
        type: "img",
      },
    ],
  },
];

const Stories = [
  {
    title: "Your Story",
    account: ACCOUNT,
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/DJQQTMR8XV.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/XLYI8D8H5R.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8N1P2AHD0W.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "ccheever",
    account: "ccheever",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TXGQ76N3J0.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "jameside",
    account: "jameside",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TZR2DHPXLS.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "notbrent",
    account: "notbrent",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/FC9HYIWC9B.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8BY0ULY9GK.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/SFJPODPJY4.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "expo.dev",
    account: "expo.dev",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TPZVAKR2HA.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/WY4HT9B3QJ.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "theavocoder",
    account: "theavocoder",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/XG1ASVK8BU.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/R7992YD801.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "umy_b",
    account: "umy_b",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TPZVAKR2HA.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/WY4HT9B3QJ.jpg",
        type: "img",
      },
    ],
  },
  {
    title: "vincentriemer",
    account: "vincentriemer",
    items: [
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TPZVAKR2HA.jpg",
        type: "img",
      },
      {
        uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/WY4HT9B3QJ.jpg",
        type: "img",
      },
    ],
  },
];
export { Stories, Highlights };
