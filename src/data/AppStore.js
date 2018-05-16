'use strict';

// @flow

import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

// Reducers
import AuthReducer from './reducers/AuthReducer';
import UsersReducer from './reducers/UsersReducer';

const reducers = combineReducers({
  auth: AuthReducer,
  user: UsersReducer
});

const AppStore = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default AppStore;
