'use strict';

// @flow

import Realm from 'realm';

import UserModel from 'models/UserModel';
import type { User } from 'types';

class UserServiceClass {
  className = UserModel.constructor.name;
  insert(data: User): User {
    return Realm.open({ schema: [UserModel] }).then(realm =>
      realm.write(() => realm.create(this.className, data))
    );
  }

  update(data: User): User {
    return Realm.open({ schema: [UserModel] }).then(realm =>
      realm.write(() => realm.create(this.className, data, true))
    );
  }

  delete(id: string): void {
    return Realm.open({ schema: [UserModel] }).then(realm => {
      let allUsers = realm.objects(this.className);
      let filtered = allUsers.filtered(`id == ${id}`);
      return realm.delete(filtered);
    });
  }

  findById(id: string): User {
    return Realm.open({ schema: [UserModel] }).then(realm => {
      let allUsers = realm.objects(this.className);
      let filtered = allUsers.filtered(`id == ${id}`);
      return filtered && filtered.length > 0 ? filtered[0] : null;
    });
  }

  findAll(): Array<User> {
    return Realm.open({ schema: [UserModel] }).then(realm =>
      realm.objects(this.className)
    );
  }
}

const DataBaseService = new UserServiceClass();

export default DataBaseService;
