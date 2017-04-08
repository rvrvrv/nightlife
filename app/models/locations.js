'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = new Schema({
	location: String,
	attendees: [ String ]
});

module.exports = mongoose.model('Location', Location);
