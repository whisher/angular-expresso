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
  expressLogger = require('express-logger');



module.exports = function(config, app, passport, db) {
  app.set('showStackError', true);

  // Prettify HTML
  app.locals.pretty = true;

  // Environment dependent middleware
  if (app.get('env') === 'development') {
    // Disable views cache
    app.set('view cache', false);
  } else if (app.get('env') === 'production') {
    app.locals.cache = 'memory';
  }

  // Should be placed before express.static
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
      path: config.rootPath + '/log/requests.log'
    }));
  }

  // assign the template engine to .html files
  app.engine('html', consolidate[config.templateEngine]);

  // set .html as the default extension
  app.set('view engine', 'html');

  // set view path
  app.set('views', config.serverPath + '/views');

  // The cookieParser should be above session
  app.use(cookieParser());

  // Request body parsing middleware should be above methodOverride
  app.use(expressValidator());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());

  

 

  // Express/Mongo session storage
  app.use(session({
    secret: config.sessionSecret,
    store: new mongoStore({
      db: db.connection.db,
      collection: config.sessionCollection
    }),
    cookie: config.sessionCookie,
    name: config.sessionName,
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
  

};
