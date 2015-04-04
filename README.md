# Angular  expresso
Angular expresso is a full-stack JavaScript open-source solution for an easy starting point for MongoDB, Node.js, Express, and AngularJS based applications.

## Credits
* [M.E.A.N Stack](https://github.com/linnovate/mean)
* [MEAN.JS](https://github.com/meanjs/mean)
* [ANIMATE SASS](https://daneden.me/animate)

## Features
* use gulp
* use sass
* use socket.io
* use helmet
* use JSON Web Tokens (auth0)
* json vulnerability protection
* xsrf vulnerability protection
* different way to manage user session (sign in, register) modal or dedicate view
* different way to manage error status 404 nice page or raw message
* all the templates cached using gulp-angular-templatecache
* no bower_components in the root

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