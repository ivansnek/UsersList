import Realm from 'realm';

import User from './User';

export default new Realm({ schema: [User], schemaVersion: 1 });
