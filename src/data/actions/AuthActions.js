'use strict';

// @flow
import { AsyncStorage } from 'react-native';
import type { ActionReturnType, Action, Credentials } from 'types';
import UserService from 'db-services/UserService';

// Action Types
export const AUTH_USER_CHANGED = 'auth.user-changed';
export const AUTH_PASSWORD_CHANGED = 'auth.password-changed';
export const AUTH_LOGIN_SUCCESS = 'auth.login_success';
export const AUTH_LOGIN_ERROR = 'auth.login_error';
export const AUTH_LOGOUT_SUCCESS = 'auth.logout_success';
export const AUTH_LOGOUT_ERROR = 'auth.logout_error';
export const AUTH_LOGIN_SAVE_ERROR = 'auth.login_save_error';
export const AUTH_BAD_CREDENTIALS = 'auth.bad_credentials';

// Action Creators
export const passwordChanged = (payload: string): ActionReturnType => ({
  payload,
  type: AUTH_PASSWORD_CHANGED
});

export const userChanged = (payload: string): ActionReturnType => ({
  payload,
  type: AUTH_USER_CHANGED
});

export const login = (data: Credentials, cb: () => void): Action => {
  return (dispatch: any): Promise<Action> => {
    const { user, password } = data;
    let userSaved;
    UserService.findByUserAndPassword(user, password)
      .then(res => (userSaved = res))
      .then(
        () =>
          userSaved
            ? AsyncStorage.setItem('AppStoreUser', JSON.stringify(userSaved))
            : Promise.reject('Your username or password are incorrect')
      )
      .then(itemSaved =>
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: true
        })
      )
      .then(() => (userSaved ? cb() : null))
      .catch(err => dispatch({ type: AUTH_LOGIN_ERROR, payload: err }));
  };
};

export const logout = (cb: () => void): Action => {
  return async (dispatch: any) => {
    try {
      let deleted = await AsyncStorage.removeItem('AppStoreUser', cb);
      if (deleted) {
        dispatch({
          type: AUTH_LOGOUT_SUCCESS,
          payload: false
        });
      } else {
        dispatch({
          type: AUTH_LOGOUT_ERROR,
          payload: true
        });
      }
    } catch (e) {
      dispatch({
        type: AUTH_LOGOUT_ERROR,
        payload: false
      });
    }
  };
};
