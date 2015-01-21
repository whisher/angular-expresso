'use strict';
var articles = require('../controllers/articles');
// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};
module.exports = function(app,auth,jwt) {

  // Send available options on OPTIONS requests
  app.options( '/api/articles', function (req, res) {
    res.send(['GET', 'PUT', 'DELETE', 'OPTIONS']);
  });

  // Root routing
  app.route('/api/articles')
    .get(jwt,articles.all)
    .post(articles.create)
    // 405 Method Not Allowed
    .all(function (req, res, next) {
      var err = new Error();
      err.route = '/api/articles';
      err.status = 405;
      next(err);
    });

  app.route('/api/articles/:articleId')
    .get(auth.isMongoId, articles.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, articles.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, articles.destroy);

  // Setting up the articleId param
  app.param('articleId', articles.article);

};