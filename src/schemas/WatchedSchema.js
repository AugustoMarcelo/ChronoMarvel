export default class WatchedSchema {
  static schema = {
    name: 'Watched',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      title: 'string',
      cover_url: 'string',
      watched: 'string'
    },
  };
}
