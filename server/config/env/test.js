'use strict';
var db = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/angular-expresso-test';
module.exports = {
  db: db,
  http: {
    port: 3001
  },
  app: {
    name: 'Angular Expresso - Mean stack'
  }
};
