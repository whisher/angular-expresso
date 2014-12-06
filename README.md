# [angular-bootstrap-cordova-seed](https://github.com/whisher/angular-bootstrap-cordova-seed/)


**Brought to you by [Fabio Bedini aka whisher](http://ilwebdifabio.it) [[@ilwebdifabio](https://twitter.com/ilwebdifabio)]**

**Speed up your [AngularJS](http://angularjs.org) development with a complete and scalable gulpjs based build system that scaffolds the project for you with bootstrap sass and cordova.**

## Credits
* [Cordova-Angular-Browserify](https://github.com/evanshortiss/cordova-angular-browserify)
* [Generator-gulpify-webapp](https://www.npmjs.org/package/generator-gulpify-webapp)


## Tools Prerequisites
* Node.js platform, installing [Node.js](http://www.nodejs.org/download/)
* Gulp - The streaming build system, installing [Gulp](http://gulpjs.com/)
* Bower - Web package manager, installing [Bower](http://bower.io/)

## Why?

This repository is intended to provide as base structure for starting 
and working with a Ionic application.


### Managing Cordova Correctly
Many Cordova projects I've worked on assume you have Cordova installed globally 
and will use that to do builds causing a major headache due to version 
mismatches. Building should be accomplished by using a localised Cordova 
version installed as part of the project and as a result this project has a 
relative symbolic link setup to accomplish this. Simply use ./cordova in the 
root of this project to perform all Cordova tasks as this will use the version 
installed locally in the node_modules folder.

## Quick Install
    git clone https://github.com/whisher/iwdf-pag-ionic.git && cd _$
    npm install
    bower install
    ./cordova -d create ./phonegap com.mydomain.phonegap AppTitle
    cd phonegap
    ../cordova -d platform add android
    ../cordova -d run android