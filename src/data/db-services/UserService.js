'use strict';

// @flow

import Realm from 'realm';

import User from 'models/User';
import realm from 'models/realm';

import type { UserType } from 'types';
import { getRandomNumber, hashCode } from 'utils';

class UserServiceClass {
  insert(data: UserType): Promise<UserType> {
    return new Promise((resolve, reject) => {
      try {
        const id = data.id ? data.id : getRandomNumber();
        realm.write(() => {
          let user = realm.create(
            User._className,
            this.encodeUserPassword({ ...data, id })
          );
          resolve(user);
        });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  update(data: UserType): Promise<UserType> {
    return new Promise((resolve, reject) => {
      try {
        realm.write(() => {
          let user = realm.create(
            User._className,
            this.encodeUserPassword(data),
            true
          );
          resolve(user);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let allUsers = realm.objects(User._className);
      let filtered = allUsers.filtered(`id == ${id}`);
      try {
        realm.write(() => {
          realm.delete(filtered);
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  findById(id: string): Promise<UserType> {
    return new Promise((resolve, reject) => {
      try {
        let filtered = realm.objects(User._className).filtered(`id == "${id}"`);
        filtered = filtered.map(x => Object.assign({}, x));
        resolve(filtered[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  findByUserAndPassword(user: string, password: string): Promise<UserType> {
    return new Promise((resolve, reject) => {
      try {
        let filtered = realm
          .objects(User._className)
          .filtered(
            `username = "${user}" AND password = "${hashCode(password)}"`
          );
        filtered = filtered.map(x => Object.assign({}, x));
        resolve(filtered[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  findAll(): Promise<Array<UserType>> {
    return new Promise((resolve, reject) => {
      try {
        let results = realm.objects(User._className);
        // realm.write(() => {
        //   realm.delete(results);
        // });
        let filtered = results.filtered('id != "ADMIN"');
        resolve(filtered.map(x => Object.assign({}, x)));
      } catch (err) {
        reject(err);
      }
    });
  }

  encodeUserPassword(data: UserType): UserType {
    return { ...data, password: data.password ? hashCode(data.password) : '' };
  }
}

const DataBaseService = new UserServiceClass();

export default DataBaseService;
