var path = require('path');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var formidable = require('formidable');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
app.disable('x-powered-by');

var init = require('./config/init.js');
console.log(init);
mongoose.connect('mongodb://localhost/test');
var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
  console.log(err);	
  }
  console.log('meow');
});

// set up handlebars view engine
/*var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');*/

app.set('port', process.env.PORT || 3000);

//Middleware;

// setup the logger
switch(app.get('env')){
	case 'development':
	// compact, colorful dev logging
	app.use(require('morgan')('dev'));
	break;
	case 'production':
	// module 'express-logger' supports daily log rotation
	app.use(require('express-logger')({
		path: __dirname + '/log/requests.log'
	}));
	break;
}
//var fs = require('fs');
//var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
//app.use(morgan('combined', {stream: accessLogStream}));

//static
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/../build'));

app.use(methodOverride());

app.use(cookieParser('pippoxxx'));

app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));
app.use(function(req, res, next){
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});

console.log( process.env.MONGOHQ_URL);
app.get('/', function(req, res) {
	res.sendFile(path.resolve('../build/index.html'));
});








// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404).send('Not found');
	//res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).send('Server error');
	//res.render('500');
});

module.exports = app;
var server = http.createServer(app);
server.listen(app.get('port'), function () {
console.log( 'Express started on http://localhost:' + 
	app.get('port') + ' env: ' + app.get('env') +  '; press Ctrl-C to terminate.' );
});