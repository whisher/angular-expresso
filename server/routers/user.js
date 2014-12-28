'use strict';

module.exports = function(app, passport) {
    var users = require('../controllers/users');
    
    app.route('/api/auth/signin').post(users.signin(passport));
    app.route('/api/auth/signup').post(users.userExists,users.signup);
   app.route('/api/auth/me').get(users.me);
    app.route('/api/auth/logout').get(function(req, res) {
        req.logout();
        res.redirect('/');
    });
};



