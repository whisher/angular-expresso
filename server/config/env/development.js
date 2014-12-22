'use strict';

module.exports = {
  db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/angular-express-dev',
  debug: true,
   mongoose: {
    debug: false
  },
  app: {
    name: 'Angular Express - Mean stack'
  }
};
