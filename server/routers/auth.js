'use strict';
var users = require('../controllers/users');
module.exports = function(app, passport, auth) {
    app.route('/api/auth/signin').post(users.signin(passport));
    app.route('/api/auth/register').post(users.userNameExists,users.userEmailExists,users.register);
    app.route('/api/auth/me').get(auth.requiresLogin,users.me);
    app.route('/api/auth/logout').get(users.signout);
    app.route('/api/auth/isloggedin').get(auth.isLoggedIn);
    // Setting up the userId param
  app.param('userId', users.user);
};



