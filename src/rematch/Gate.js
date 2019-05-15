import { init } from '@rematch/core';
import createRematchPersist, { getPersistor } from '@rematch/persist';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import * as models from './models';

const persistPlugin = createRematchPersist({
  // whiteList: ['user', 'onBoarding'],
  // blackList: ['users', 'hasMoreUsers', 'isLoadingUsers'],
  //   throttle: 5000,
  version: 3,
  storage: AsyncStorage,
});

const PERSIST_DATA = false;
export const store = init({
  models,
  plugins: [PERSIST_DATA && persistPlugin],
});

global.__rematch_store = store;
global.__rematch_dispatch = store.dispatch;

class Gate extends React.Component {
  render() {
    const { children } = this.props;

    if (!PERSIST_DATA) {
      return <Provider store={store}>{children}</Provider>;
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={getPersistor()}>{children}</PersistGate>
      </Provider>
    );
  }
}

export default Gate;
