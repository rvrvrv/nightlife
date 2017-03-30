'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	facebook: {
		id: String,
		firstName: String,
		lastName: String
	}
});

module.exports = mongoose.model('User', User);
