'use strict';

/**
 * Module dependencies.
 */
var config = require('./server/config/config'),
	http = require('http'),
	express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	passport = require('passport');


// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error('Could not connect to MongoDB!');
		console.log(err);
	}
});
 
 // Models
require(config.serverPath+'/models/item');
require(config.serverPath+ '/models/user');



require(config.serverPath+'/config/passport')(passport);
require(config.serverPath+'/config/express')(config,app,passport,db);
app.use(require('connect-livereload')());
app.set('port', process.env.PORT || 3000);
app.use(express.static(config.rootPath + '/build'));

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
require(config.serverPath+'/routers/core')(app);
require(config.serverPath+'/routers/item')(app);
require(config.serverPath+'/routers/user')(app,passport);



/*app.use(function(req, res, next){console.error(req.xhr);
	//console.error(err);
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){console.error(req.xhr);
	console.log(err);
	res.status(500);
	res.render('500');
});	
*/
app.use(function(err, req, res, next) {
	// If the error object doesn't exists
	if (!err){
		return next();
	}
	// Log it
	console.error(err.stack);

	// Error page
	res.status(500).render('500', {
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
