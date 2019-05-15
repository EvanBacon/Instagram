// import dispatch from './dispatch';

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
export const camera = {
  state: {
    type: 'back',
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
