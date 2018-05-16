'use strict';

// @flow

type Payload = Object | string | number | boolean | Gender;

export type ActionReturnType = {
  payload: Payload,
  type: string
};

export type Action = (payload: Payload) => Action;

export type Credentials = {
  user: string,
  password: string
};

export type Gender = 'Men' | 'Women';

export type UserType = {
  id?: ?string,
  name: string,
  lastName: string,
  age?: ?number,
  gender?: ?Gender,
  active: boolean,
  username?: ?string,
  password?: ?string,
  getFullName?: ?() => string
};

export type ThunkMiddleWare = () => void;
