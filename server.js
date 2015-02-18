'use strict';

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

app.use(favicon(path.join(configs.rootPath,configs.releasePath,'favicon.ico')));
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

//Cluster debug
/*if (app.get('env') === 'development') {
	app.use(function(req,res,next){
		var cluster = require('cluster');
		if(cluster.isWorker) {
			console.log('Worker %d received request',cluster.worker.id);
		}
	});
}*/

// Routes
require(configs.serverPath+'/routers/index')(app);
require(configs.serverPath+'/routers/auth')(app, auth, configs, passport);
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
  	if (err.status === 405) {
    		res.status(405).send('Method Not Allowed');
  	}
  	res.status(500).send('Internal Server Error');
});

// Assume 404 since no middleware responded
app.use(function(req, res) {
	// Log it
	console.error(req.url);
	if(configs.niceErrorPage){
		return res.status(404).render('404');
	}
	res.status(404).send('Not Found');
});

if (app.get('env') === 'development') {
	app.use(errorHandler());
}

var server = http.createServer(app);
var io = sio(server);

io.use(socketio_jwt.authorize({
  secret: configs.apiSecret,
  handshake: true
}));

io.on('connection', require(configs.serverPath+'/routers/socket')(io));


server.listen(app.get('port'), function () {
	console.log( 'Express started on http://localhost:' + 
		app.get('port') + ' env: ' + app.get('env') +  '; press Ctrl-C to terminate.' );
});

exports = module.exports = app;
