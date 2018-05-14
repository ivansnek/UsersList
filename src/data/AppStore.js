'use strict';

// @flow

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

const reducers = combineReducers({});

const AppStore = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default AppStore;
