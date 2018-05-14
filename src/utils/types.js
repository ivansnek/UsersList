'use strict';

// @flow

export type Gender = 'Men' | 'Women';

export type UserType = {
  name: string,
  lastName: string,
  age: number,
  gender: Gender,
  active: boolean,
  user: string,
  password: string
};
