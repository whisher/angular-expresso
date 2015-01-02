'use strict';
var users = require('../controllers/users');
module.exports = function(app, passport, auth) {
    app.route('/api/auth/signin').post(users.signin(passport));
    app.route('/api/auth/signup').post(users.userExists,users.signup);
    app.route('/api/auth/me').get(auth.requiresLogin,users.me);
    app.route('/api/auth/logout').get(users.signout);
    app.route('/api/auth/isloggedin').get(auth.isLoggedIn);
};



