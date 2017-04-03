'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = new Schema({
	location: String,
	attendees: [{
		text: String
	}]
});

module.exports = mongoose.model('Location', Location);
