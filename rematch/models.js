import * as Permissions from 'expo-permissions';

import dispatch from './dispatch';

export const image = {
  state: null,
  reducers: {
    update: (state, payload) => ({ ...state, ...payload }),
    set: (state, payload) => payload,
  },
  effects: {
    getAsync: async (props = {}) => {
      //   const { permission } = props;
      //   const { status } = await Permissions.getAsync(permission);
      //   dispatch.permissions.update({ [permission]: status });
    },
  },
};

export const splash = {
  state: true,
  reducers: {
    update: (state, payload) => ({ ...state, ...payload }),
    set: (state, payload) => payload,
  },
};
export const permissions = {
  state: {
    location: undefined,
  },
  reducers: {
    update: (state, payload) => ({ ...state, ...payload }),
    set: (state, payload) => payload,
  },
  effects: {
    getAsync: async (props = {}) => {
      const { permission } = props;
      const { status } = await Permissions.getAsync(permission);
      dispatch().permissions.update({ [permission]: status });
    },
    askAsync: async (props = {}) => {
      const { permission } = props;
      const { status } = await Permissions.askAsync(permission);
      dispatch().permissions.update({ [permission]: status });
    },
  },
};

export const camera = {
  state: {
    type: 'front',
  },
  reducers: {
    update: (state, payload) => ({ ...state, ...payload }),
    set: (state, payload) => payload,
    flip: ({ type, ...state }) => {
      return {
        ...state,
        type: type === 'back' ? 'front' : 'back',
      };
    },
  },
  effects: {
    getAsync: async (props = {}) => {
      //   const { permission } = props;
      //   const { status } = await Permissions.getAsync(permission);
      //   dispatch.permissions.update({ [permission]: status });
    },
  },
};

export { default as stories } from './stories';
