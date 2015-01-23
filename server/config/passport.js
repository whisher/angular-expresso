'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');
   
module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, '-password').exec(function (err, user) {
            done(err, user);
        });
    });

     

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                email :  email
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, 'Unknown user or invalid password');
                }
                if (!user.authenticate(password)) {
                    return done(null, false, 'Unknowng user or invalid password');
                }

                return done(null, user);
            });
        }
    ));

};