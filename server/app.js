'use strict';

/**
 * Module dependencies.
 */
var config = require('./config/config'),
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
 require('./models/item');
/*var Item = mongoose.model('Item');
new Item({title:'Il mio',content:'Il tuo'}).save();
Item.find(function(err,req){
console.log(err,req);
});*/
require(config.root + '/config/express')(config,app,passport,db);
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../build'));

require('./routers/core')(app);
require('./routers/item')(app);
/*app.route('/').get(function(req, res) {
	res.sendFile(path.resolve('../build/index.html'));
});*/

app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});	
var server = http.createServer(app);
server.listen(app.get('port'), function () {
console.log( 'Express started on http://localhost:' + 
	app.get('port') + ' env: ' + app.get('env') +  '; press Ctrl-C to terminate.' );
});