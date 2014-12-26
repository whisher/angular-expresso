'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/signin');
    }
    next();
};

/**
 * Generic require login routing middleware
 */
exports.apiRequiresLogin = function(req, res,next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json('User is not authorized');
    }
    next();
};