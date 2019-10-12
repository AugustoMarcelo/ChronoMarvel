export default class MovieSchema {
  static schema = {
    name: 'Movie',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      title: 'string',
      release_date: 'string',
      overview: 'string',
      duration: 'int',
      phase: 'int',
      saga: 'string',
      chronology: 'int',
      cover_url: 'string',
      banner_url: 'string',
      watched: 'string'
    },
  };
}
