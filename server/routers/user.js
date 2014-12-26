'use strict';

module.exports = function(app, passport) {
    var users = require('../controllers/users');
    
   

    app.route('/api/auth/signin').post(users.signin(passport));
    app.route('/api/auth/signup').post(users.userExists,users.signup);
   
    app.route('/api/auth/logout').get(function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

