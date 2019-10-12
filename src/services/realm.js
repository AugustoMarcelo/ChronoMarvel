import Realm from 'realm';

import WatchedSchema from '../schemas/WatchedSchema';

export default function getRealm() {
  return Realm.open({
    schema: [WatchedSchema],
  });
}
