'use strict';

var Users = require('../models/users.js');

function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.attend = function (reqLoc, reqUser, res) {
		console.log('User: ' + reqUser);
		console.log('Location: ' + reqLoc);
		res.json(reqLoc);
		
		//TO DO: Check if user is already attending location.
		//If so, remove them and return negative response, update count -1
		//If not, add them and return positive response, update count +1
		
		//Potential search
		// Locations
		// 	.findOneAndUpdate({ 'location': reqLoc, 'attendees': reqUser }, { $inc: { 'total': 1 } })
		// 	.exec(function (err, result) {
		// 			if (err) throw err;
		// 			res.json(result.nbrClicks);
		// 		}
		// 	);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = ClickHandler;
