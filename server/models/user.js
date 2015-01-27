'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt   = require('bcrypt-nodejs');
	
/**
* User schema
*/
var UserSchema = new Schema({
	username: {
		type: String,
		unique:true,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique:true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	provider: {
		type: String,
		default: 'local'
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	}		
});

/**
* Presave hook
*/
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.password = this.generateHash(this.password);
	}
	next();
});

/**
* Generating a hash
*/
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

/**
* Instance method for authenticating user
*/
 UserSchema.methods.authenticate = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.isAdmin = function() {
    return this.role.indexOf('admin') !== -1;
};
/**
* Create the model for users and expose it to our app
*/
mongoose.model('User', UserSchema);
