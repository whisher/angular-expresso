'use strict';
var db = process.env.MONGOLAB_URI ||
		process.env.MONGOHQ_URL ||
		'mongodb://localhost/angular-expresso-dev';
module.exports = {
  db: db,
  debug: true,
   mongoose: {
    debug: false
  },
  app: {
    name: 'Angular Express - Mean stack'
  }
};
