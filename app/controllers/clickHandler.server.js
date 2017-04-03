'use strict';

var Locations = require('../models/locations.js');

function ClickHandler () {

	this.getClicks = function (req, res) {
		Locations
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.attend = function (reqLoc, reqUser, res) {
		console.log('Location: ' + reqLoc);
		console.log('User: ' + reqUser);
		//TO DO: Check if user is already attending location.
		//If so, remove them and return negative response
		//If not, add them and return positive response
		Locations
			.findOneAndUpdate({
				'location': reqLoc
			}, {
				$addToSet: {
					'attendees': {
						user: reqUser
					}
				},
			},
				{ upsert: true, new: true }
			)
			.exec(function(err, result) {
				if (err) throw err;
				console.log(result);
				res.json({location: result.location,
					total: result.attendees.length});
			});
	};

	this.resetClicks = function (req, res) {
		Locations
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = ClickHandler;
