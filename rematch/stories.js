import {
  LayoutAnimation,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
// import data from './data';
import dispatch from './dispatch';
// import store from './store';
const { width, height } = Dimensions.get('window');

export const VERTICAL_THRESHOLD = 80;

export const HORIZONTAL_THRESHOLD = 60;

export let indicatorAnim = new Animated.Value(0);

export let verticalSwipe = new Animated.Value(0);

export const data = [
  {
    idx: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
    items: [
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TXGQ76N3J0.jpg',
        type: 'img',
      },
    ],
  },
  {
    idx: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg',
    items: [
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TZR2DHPXLS.jpg',
        type: 'img',
      },
    ],
  },
  {
    idx: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg',
    items: [
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/DJQQTMR8XV.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/XLYI8D8H5R.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8N1P2AHD0W.jpg',
        type: 'img',
      },
    ],
  },
  {
    idx: 0,
    avatar:
      'https://s3.amazonaws.com/uifaces/faces/twitter/csswizardry/128.jpg',
    items: [
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/FC9HYIWC9B.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8BY0ULY9GK.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/SFJPODPJY4.jpg',
        type: 'img',
      },
    ],
  },
  {
    idx: 0,
    avatar:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    items: [
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TPZVAKR2HA.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/WY4HT9B3QJ.jpg',
        type: 'img',
      },
    ],
  },
  {
    idx: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
    items: [
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/R16PYWVG7N.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TXGQ76N3J0.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/5ECBT47XF5.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/95U1U3BR0Y.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/T6J8OZBM38.jpg',
        type: 'img',
      },
    ],
  },
  {
    idx: 0,
    avatar:
      'https://s3.amazonaws.com/uifaces/faces/twitter/flamekaizar/128.jpg',
    items: [
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OQ47D2T5AP.jpg',
        type: 'img',
      },
    ],
  },
  {
    idx: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/itsjonq/128.jpg',
    items: [
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/XG1ASVK8BU.jpg',
        type: 'img',
      },
      {
        uri:
          'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/R7992YD801.jpg',
        type: 'img',
      },
    ],
  },
];

function getCurrentStory({ stories, deckIdx }) {
  if (stories.length <= 0) {
    return null;
  }
  return stories[deckIdx];
}
const stories = {
  state: {
    offset: { top: height / 2, left: width / 2 },
    carouselOpen: false,

    stories: data,
    deckIdx: 0,
    paused: false,
    backOpacity: 0,
    swipedHorizontally: true,
  },
  reducers: {
    update: (state, payload) => ({ ...state, ...payload }),
    set: (state, payload) => payload,
    setPaused: (state, paused) => ({
      ...state,
      paused,
    }),
    setStoryIdx: ({ stories, ...state }, idx) => {
      let mutableStories = [...stories];
      if (stories[state.deckIdx]) {
        mutableStories[state.deckIdx].idx = idx;
      }
      return {
        ...state,
        stories: [...mutableStories],
      };
    },
    setBackOpacity: (state, backOpacity) => ({
      ...state,
      backOpacity,
    }),
  },
  effects: {
    openCarousel({ index, offset }, state) {
      dispatch().stories.update({ offset, deckIdx: index });

      requestAnimationFrame(() => {
        LayoutAnimation.easeInEaseOut();
        dispatch().stories.update({ carouselOpen: true });
        dispatch().stories.animateIndicator(true);
      });
    },

    onMoveShouldSetPanResponderCapture(
      {
        e,
        gesture: { dx, dy },
      },
      state,
    ) {
      if (Math.abs(dx) > 5) {
        dispatch().stories.update({ swipedHorizontally: true });
        return true;
      }

      if (dy > 5) {
        dispatch().stories.update({ swipedHorizontally: false });
        return true;
      }

      return false;
    },

    onPanResponderGrant(
      props,
      {
        stories: { swipedHorizontally },
      },
    ) {
      dispatch().stories.pause();
      dispatch().stories.setBackOpacity(0);
    },

    onPanResponderMove(
      {
        e,
        gesture: { dx, dy },
      },
      {
        stories: { swipedHorizontally },
      },
    ) {
      if (!swipedHorizontally) {
        // horizontalSwipe.setValue(-dx);
        // } else {
        verticalSwipe.setValue(dy);
      }
    },

    onPanResponderRelease(
      {
        direction,
        // gesture: { dx, vy, ...gesture },
      },
      {
        stories: { swipedHorizontally, deckIdx, stories },
      },
    ) {
      if (!swipedHorizontally) {
        if (direction === 'SWIPE_DOWN') {
          Animated.timing(verticalSwipe, {
            toValue: Dimensions.get('window').height * 2,
            duration: 300,
          }).start(() => {
            dispatch().stories.leaveStories();
          });
        } else {
          dispatch().stories.play();
          dispatch().stories.resetVerticalSwipe();
        }
        return;
      }

      // horizontalSwipe.flattenOffset();

      if (direction === 'SWIPE_RIGHT') {
        // previous deck
        if (deckIdx === 0) {
          dispatch().stories.leaveStories();
        } else {
          // dispatch().stories.animateDeck({ toValue: width * (deckIdx - 1), reset: true });
        }
      } else if (direction === 'SWIPE_LEFT') {
        // -> next deck
        if (deckIdx === stories.length - 1) {
          dispatch().stories.leaveStories();
        } else {
          // dispatch().stories.animateDeck({ toValue: width * (deckIdx + 1), reset: true });
        }
      } else {
        dispatch().stories.play();
        dispatch().stories.animateDeck({ toValue: width * deckIdx });
      }
    },

    dismissCarousel() {
      LayoutAnimation.easeInEaseOut();
      dispatch().stories.update({ carouselOpen: false });
    },

    leaveStories(
      props,
      {
        stories: { swipedHorizontally, deckIdx },
      },
    ) {
      if (swipedHorizontally) {
        dispatch().stories.animateDeck({ toValue: width * deckIdx });
      } else {
        dispatch().stories.resetVerticalSwipe();
      }

      dispatch().stories.dismissCarousel();
    },

    pause() {
      dispatch().stories.update({ paused: true });
      indicatorAnim.stopAnimation();
    },

    play(
      props,
      {
        stories: { paused },
      },
    ) {
      if (paused) {
        dispatch().stories.update({ paused: false });
        dispatch().stories.animateIndicator(false);
      }
    },

    animateIndicator(reset, state) {
      if (reset) {
        indicatorAnim.setValue(0);
      }

      requestAnimationFrame(() => {
        Animated.timing(indicatorAnim, {
          toValue: 1,
          duration: 5000 * (1 - indicatorAnim._value),
        }).start(({ finished }) => {
          if (finished) {
            // console.log('FINISHED');
            dispatch().stories.onNextItem();
          }
        });
      });
    },

    resetVerticalSwipe() {
      Animated.spring(verticalSwipe, { toValue: 0 }).start();
    },

    onNextItem(
      props,
      {
        stories: { paused, stories, deckIdx },
      },
    ) {
      // console.log('onNextItem', paused, stories, deckIdx);
      if (paused) {
        return dispatch().stories.play();
      }

      const story = getCurrentStory({ stories, deckIdx });
      // console.log('onNextItem.story', story);
      if (story) {
        if (story.idx >= story.items.length - 1) {
          // console.log('onNextItem.story.nextStory');
          return dispatch().stories.onNextDeck();
        }
        // console.log('onNextItem.story.continue', story.idx + 1);
        dispatch().stories.animateIndicator(true);
        dispatch().stories.setStoryIdx(story.idx + 1);
      } else {
        console.warn('No Story ', { paused, stories, deckIdx });
      }
    },

    onPrevItem(
      props,
      {
        stories: { backOpacity, ...stories },
      },
    ) {
      if (backOpacity === 1) {
        dispatch().stories.update({ backOpacity: 0 });
      }

      const story = getCurrentStory(stories);

      if (story.idx === 0) {
        return dispatch().stories.onPrevDeck();
      }

      dispatch().stories.animateIndicator(true);
      dispatch().stories.setStoryIdx(story.idx - 1);
    },
    onNextDeck(
      props,
      {
        stories: { deckIdx, stories },
      },
    ) {
      if (deckIdx >= stories.length - 1) {
        return dispatch().stories.leaveStories();
      }
      dispatch().stories.animateDeck({
        toValue: (deckIdx + 1) * width,
        reset: true,
      });
    },

    onPrevDeck(
      props,
      {
        stories: { deckIdx, stories },
      },
    ) {
      if (deckIdx === 0) {
        return dispatch().stories.leaveStories();
      }
      dispatch().stories.animateDeck({
        toValue: (deckIdx - 1) * width,
        reset: true,
      });
    },

    animateDeck({ toValue, reset = false }, state) {
      if (reset) {
        const nextDeckIndex = parseInt(toValue / width);
        dispatch().stories.update({ deckIdx: nextDeckIndex });
        dispatch().stories.animateIndicator(true);
      }
    },
  },
};

export default stories;
