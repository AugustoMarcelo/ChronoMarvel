import Realm from 'realm';

import MovieSchema from '../schemas/MovieSchema';

export default function getRealm() {
  return Realm.open({
    schema: [MovieSchema],
  });
}
