'use strict';

var path = require('path');
var assert = require("assert");
var request = require('supertest');

var expressFile = path.resolve(__dirname, '../server.js');
//console.log(startFile);
var app = require(expressFile);
describe('Api', function(){
	it('should return 200 on /', function (done) {

    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err)
        done()
      })

  })

  	
});
/*
describe('User Api', function () {
	var user = {email:'io@il.it',password:'ppppp'};
	it('should return 200 on /', function (done) {
		request(app)
      			.get('/')
      			.expect(300)
      			.end(function(err, res){console.log(err);
        if (err) return done(err);
        done()
      });
      	});
	it('sign up should return 400 on /', function (done) {
		request(app)
      			.post('/api/auth/signup')
      			.send({})
      			.expect(400)
      			.expect("marcus is stored", done);
      	});
	
})*/