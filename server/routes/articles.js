'use strict';

/**
 * Module dependencies.
 */
var articles = require('../controllers/articles'),
  auth = require('../middlewares/auth');
  
module.exports = function(app) {
  var jwt = require('../middlewares/jwt')(app);

  // Send available options on OPTIONS requests
  app.options( '/api/articles', function (req, res) {
    res.send(['GET', 'PUT', 'DELETE', 'OPTIONS']);
  });

  // Root routing
  app.route('/api/articles')
    .get(articles.all)
    .post(jwt,articles.create)
    // 405 Method Not Allowed
    .all(function (req, res, next) {
      var err = new Error();
      err.route = '/api/articles';
      err.status = 405;
      next(err);
    });

  app.route('/api/articles/:articleId')
    .get(auth.isMongoId, articles.show)
    .put(auth.isMongoId, jwt, auth.isOwner, articles.update)
    .delete(auth.isMongoId, jwt, auth.isOwner, articles.destroy);

  // Setting up the articleId param
  app.param('articleId', articles.article);

};