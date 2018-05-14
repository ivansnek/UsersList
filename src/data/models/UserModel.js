'use strict';

// @flow
import Realm from 'realm';

class User extends Realm.Object {
  constructor() {
    super();
  }

  isActive(): boolean {
    return this.active;
  }

  getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }
}

User.schema = {
  name: 'User',
  properties: {
    name: 'string',
    lastName: 'string',
    age: 'int',
    gender: 'string',
    active: 'bool',
    user: 'string',
    password: 'string'
  }
};

export default User;
