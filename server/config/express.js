'use strict';

/**
 * Module dependencies.
 */
var compression = require('compression'),
  morgan = require('morgan'),
  consolidate = require('consolidate'),
  cookieParser = require('cookie-parser'),
  expressValidator = require('express-validator'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  mongoStore = require('connect-mongo')(session),
  flash = require('connect-flash'),
  helmet = require('helmet'),
  expressLogger = require('express-logger'),
  jsonProtection = require('../middlewares/json.protection'),
  csrf = require('csurf');

module.exports = function(configs, app, passport, db) {
  // Setting application local variables
  app.locals.tokenExpiresInMinutes = configs.tokenExpiresInMinutes;
  app.locals.apiSecret = configs.apiSecret;
  
  // show error on screen. False for all envs except development
  app.set('showStackError', (app.get('env') === 'development'));

  // Prettify HTML
  app.locals.pretty = true;

  // Environment dependent middleware
  if (app.get('env') === 'development') {
    // Disable views cache
    app.set('view cache', false);
  } 
  else if (app.get('env') === 'production') {
    app.locals.cache = 'memory';
  }

  //Json vulnerability protection
  app.use(jsonProtection);

  // To ensure that all assets and data are compressed (utilize bandwidth)
  app.use(compression({
    // Levels are specified in a range of 0 to 9, where-as 0 is
    // no compression and 9 is best compression, but slowest
    level: 9
  }));

  // Only use logger for development environment
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  else{
    app.use(expressLogger({
      path: configs.rootPath + '/log/requests.log'
    }));
  }

  // assign the template engine to .html files
  app.engine('html', consolidate[configs.templateEngine]);

  // set .html as the default extension
  app.set('view engine', 'html');

  // set view path
  app.set('views', configs.serverPath + '/views');

  // The cookieParser should be above session
  app.use(cookieParser());

  // Request body parsing middleware should be above methodOverride
  app.use(expressValidator());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(methodOverride());

  // Express/Mongo session storage
  app.use(session({
    secret: configs.sessionSecret,
    store: new mongoStore({
      db: db.connection.db,
      collection: configs.sessionCollection
    }),
    cookie: configs.sessionCookie,
    name: configs.sessionName,
    resave: true,
    saveUninitialized: true
  }));

  // Use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // Connect flash for flash messages
  app.use(flash());

  // Use helmet to secure Express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.use(helmet.hidePoweredBy());

  //xsrf vulnerability protection
  app.use(csrf());
  app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN'){ 
      return next(err);
    }
    // handle CSRF token errors here
    res.status(403).send('Forbidden');
  });
};
