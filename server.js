'use strict';

/**
* Set up debug for developement
*/
 if (process.env.NODE_ENV === 'development') {
 	process.env.DEBUG = 'app:*';
}

/**
 * Module dependencies.
 */
var fs = require('fs'),
	http = require('http'),
	express = require('express'),
	app = express(),
	favicon = require('serve-favicon'),
	path = require('path'),
	passport = require('passport'),
	errorHandler = require('errorhandler'),
	sio = require('socket.io'),
	socketio_jwt = require('socketio-jwt'),
	configs = require('./server/config/config'),
	auth = require('./server/middlewares/auth'),
	debug = require('debug'),
	info = debug('app:info'),
	error = debug('app:error');

// Bootstrap db connection
var db = require('./server/config/db')(configs);
 
// Bootstrap models
var modelsPath = path.join(configs.serverPath+ '/models');
fs.readdirSync(modelsPath).forEach(function (file) {
	require(modelsPath + '/' + file);
});

// Set up passport
require(configs.serverPath+'/config/passport')(passport);

// Set up express
require(configs.serverPath+'/config/express')(configs, app, passport, db);

//No 304 status 
if (app.get('env') === 'development') {
 	app.disable('etag');
}

// Set up port
app.set('port', process.env.PORT || 3000);

// Set up static
app.use(favicon(path.join(configs.rootPath,configs.releasePath,'favicon.ico')));
app.use(express.static( path.join(configs.rootPath, configs.releasePath)));

// Routes
require(configs.serverPath+'/routers/index')(app);
require(configs.serverPath+'/routers/auth')(app);
require(configs.serverPath+'/routers/users')(app);
require(configs.serverPath+'/routers/articles')(app);

app.use(function(err, req, res, next) {
	// If the error object doesn't exists
	if (!err){
		return next();
	}
	// Log it
	error(err.stack);
	//For /api
	if (err.constructor.name === 'UnauthorizedError') {
    		res.status(401).send('Unauthorized');
  	}
  	if (err.status === 405) {
    		res.status(405).send('Method Not Allowed');
  	}
  	res.status(500).send('Internal Server Error');
});

// Assume 404 since no middleware responded
app.use(function(req, res) {
	// Log it
	error(req.url);
	if(configs.niceErrorPage){
		return res.status(404).render('404');
	}
	res.status(404).send('Not Found');
});

// Error handler
if (app.get('env') === 'development') {
	app.use(errorHandler());
}

// Set up socket.io
var server = http.createServer(app);
var io = sio(server);
io.use(socketio_jwt.authorize({
  secret: configs.apiSecret,
  handshake: true
}));
io.on('connection', require(configs.serverPath+'/routers/socket')(io));

// Binds and listens for connections
server.listen(app.get('port'), function () {
	info( 'Express started on http://localhost:' + 
		app.get('port') + ' env: ' + app.get('env') +  '; press Ctrl-C to terminate.' );
});

// Making the app variable be referenced directly from another module
exports = module.exports = app;
