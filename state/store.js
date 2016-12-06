import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation';

import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import friendsReducer from './reducers/friends';
import friendReducer from './reducers/friend';
import authReducer from './reducers/auth';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation'
});

const rootReducer = combineReducers({
  // navigation: NavigationReducer,
  friends: friendsReducer,
  friend: friendReducer,
  auth: authReducer
});

/* eslint-disable no-underscore-dangle */
// const store = createStoreWithNavigation(
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    devToolsEnhancer()
  )
);
/* eslint-enable */

export default store;
