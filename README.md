# Angular  expresso
Angular expresso is a full-stack JavaScript open-source solution for an easy starting point for MongoDB, Node.js, Express, and AngularJS based applications.

## Credits
* [M.E.A.N Stack](https://github.com/linnovate/mean)
* [MEAN.JS](https://github.com/meanjs/mean)


## Features
* use gulp
* use sass
* use socket.io
* use socket custom namespaces
* use helmet
* json vulnerability protection
* xsrf vulnerability protection
* use JSON Web Tokens (auth0)
* protected view
* user session (sign in, register) modal or dedicate view
* error status 404 nice page or raw message
* templates cached using gulp-angular-templatecache (apart from protected view)
* no bower_components in the root
* ready for animation

## Install
* npm install
* bower install
* gulp

### Production/Heroku
* npm install
* bower install
* gulp --release
* heroku create
* heroku addons:add mongolab
* git push heroku master
* heroku open