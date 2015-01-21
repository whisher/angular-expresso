'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
	http = require('http'),
	express = require('express'),
	app = express(),
	path = require('path'),
	passport = require('passport'),
	errorHandler = require('errorhandler'),
	configs = require('./server/config/config'),
	auth = require('./server/middlewares/auth'),
	jwt = require('./server/middlewares/jwt')(configs);

// Bootstrap db connection
var db = require('./server/config/db')(configs);
 
// Bootstrap models
var modelsPath = path.join(configs.serverPath+ '/models');
fs.readdirSync(modelsPath).forEach(function (file) {
	require(modelsPath + '/' + file);
});

require(configs.serverPath+'/config/passport')(passport);

// We are going to protect /api routes with JWT
//app.use('/api', expressJwt({secret: configs.apiSecret}));


require(configs.serverPath+'/config/express')(configs,app,passport,db);

 if (app.get('env') === 'development') {
 	app.disable('etag');
	app.use(require('connect-livereload')());
}
app.set('port', process.env.PORT || 3000);
app.use(express.static( path.join(configs.rootPath, configs.releasePath)));

/*
var router = express.Router();

router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            // intercept OPTIONS method
	if ('OPTIONS' == req.method) {
	      return res.sendStatus(200);
	}
   	next();
});
app.use('/api', router);
*/
// Routes
require(configs.serverPath+'/routers/auth')(app, configs, passport);
require(configs.serverPath+'/routers/users')(app, auth);
require(configs.serverPath+'/routers/articles')(app, auth, jwt);




app.use(function(err, req, res, next) {
	// If the error object doesn't exists
	if (!err){
		return next();
	}
	// Log it
	console.error(err.stack);
	//For /api
	if (err.constructor.name === 'UnauthorizedError') {
    		res.status(401).send('Unauthorized');
  	}
	// TODO catch 405 status 
	// Error page
	res.status(err.status || 500).render('500', {
		error: err.stack
	});
});

// Assume 404 since no middleware responded
app.use(function(req, res) {
	res.status(404).render('404', {
		url: req.originalUrl,
		error: 'Not Found'
	});
});

if (app.get('env') === 'development') {
	app.use(errorHandler());
}
var server = http.createServer(app);
var io = require('socket.io')(server);



io.on('connection', function(socket){
	console.log('a user connected');
});
server.listen(app.get('port'), function () {
	console.log( 'Express started on http://localhost:' + 
		app.get('port') + ' env: ' + app.get('env') +  '; press Ctrl-C to terminate.' );
});

exports = module.exports = app;
