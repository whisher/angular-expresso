'use strict';
var users = require('../controllers/users');
module.exports = function(app, passport, auth) {
    app.route('/api/auth/login').post(users.login(passport));
    app.route('/api/auth/signup').post(users.userNameExists,users.userEmailExists,users.signup);
    app.route('/api/auth/me').get(auth.requiresLogin,users.me);
    app.route('/api/auth/logout').get(users.signout);
    app.route('/api/auth/isloggedin').get(auth.isLoggedIn);
    // Setting up the userId param
  app.param('userId', users.user);
};



