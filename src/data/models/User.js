'use strict';

// @flow

import Realm from 'realm';

class User extends Realm.Object {
  static _className = 'User';
  constructor() {
    super();
  }

  getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }
}

User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    lastName: 'string',
    age: 'int?',
    gender: 'string?',
    active: 'bool?',
    username: 'string?',
    password: 'string?'
  }
};

export default User;
