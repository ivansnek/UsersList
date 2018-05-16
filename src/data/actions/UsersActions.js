'use strict';

// @flow
import UserService from 'db-services/UserService';
import type {
  UserType,
  Action,
  ThunkMiddleWare,
  ActionReturnType
} from 'types';

// Action Types
export const USER_LOAD_USER = 'user.load-user';
export const USER_LOAD_USER_ERROR = 'user.load-user-error';
export const USER_LOAD_USERS = 'user.load-users';
export const USER_LOAD_USERS_ERROR = 'user.load-users-error';
export const USER_ADD_SUCCESS = 'user.add-success';
export const USER_ADD_ERROR = 'user.add-error';
export const USER_UPDATE_SUCCESS = 'user.update-success';
export const USER_UPDATE_ERROR = 'user.update-error';
export const USER_ACTIVE_CHANGED = 'user.active-changed';
export const USER_NAME_CHANGED = 'user.name-changed';
export const USER_LASTNAME_CHANGED = 'user.lastname-changed';
export const USER_AGE_CHANGED = 'user.age-changed';
export const USER_GENDER_CHANGED = 'user.gender-changed';
export const USER_USERNAME_CHANGED = 'user.username-changed';
export const USER_PASSWORD_CHANGED = 'user.password-changed';

// Action Creators
export const nameChanged = (payload: string): ActionReturnType => ({
  type: USER_NAME_CHANGED,
  payload
});

export const lastNameChanged = (payload: string): ActionReturnType => ({
  type: USER_LASTNAME_CHANGED,
  payload
});

export const ageChanged = (payload: number): ActionReturnType => ({
  type: USER_AGE_CHANGED,
  payload
});

export const genderChanged = (payload: string): ActionReturnType => ({
  type: USER_GENDER_CHANGED,
  payload
});

export const usernameChanged = (payload: string): ActionReturnType => ({
  type: USER_USERNAME_CHANGED,
  payload
});

export const passwordChanged = (payload: string): ActionReturnType => ({
  type: USER_PASSWORD_CHANGED,
  payload
});

export const activeChanged = (payload: boolean): ActionReturnType => ({
  type: USER_ACTIVE_CHANGED,
  payload: !payload
});

export const loadUsers = (): ThunkMiddleWare => {
  return (dispatch: any) => {
    UserService.findAll()
      .then(users =>
        dispatch({
          type: USER_LOAD_USERS,
          payload: users
        })
      )
      .catch(err =>
        dispatch({
          type: USER_LOAD_USERS_ERROR,
          payload: err
        })
      );
  };
};

export const addUser = (user: UserType, cb: () => void): ThunkMiddleWare => {
  return (dispatch: any) => {
    UserService.insert(user)
      .then(res =>
        dispatch({
          type: USER_ADD_SUCCESS,
          payload: res
        })
      )
      .then(() => cb())
      .catch(err =>
        dispatch({
          type: USER_ADD_ERROR,
          payload: err
        })
      );
  };
};

export const updateUser = (
  user: UserType,
  cb: ?() => void
): ThunkMiddleWare => {
  return (dispatch: any) => {
    UserService.update(user)
      .then(res =>
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: res
        })
      )
      .then(() => (cb ? cb() : true))
      .catch(err => {
        console.log('ERR', err);
        dispatch({
          type: USER_UPDATE_ERROR,
          payload: err
        });
      });
  };
};

export const loadUserById = (userId: string): ThunkMiddleWare => {
  return (dispatch: any) => {
    UserService.findById(userId)
      .then(res =>
        dispatch({
          type: USER_LOAD_USER,
          payload: res
        })
      )
      .catch(err =>
        dispatch({
          type: USER_LOAD_USER_ERROR,
          payload: err
        })
      );
  };
};
