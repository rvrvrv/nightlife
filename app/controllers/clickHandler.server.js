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

	//Add user to list of attendees
	this.attend = function (reqLoc, reqUser, res) {
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
					total: result.attendees.length,
					action: 'attending'
				});
			});
	};

	//Remove user from list of attendees
	this.unAttend = function (reqLoc, reqUser, res) {
		Locations
			.findOneAndUpdate({
				'location': reqLoc
			}, {
				$pull: {
					'attendees': {
						user: reqUser
					}
				},
			},
				{ new: true }
			)
			.exec(function(err, result) {
				if (err) throw err;
				console.log(result);
				res.json({location: result.location,
					total: result.attendees.length,
					action: 'not attending'
				});
			});
	};

}

module.exports = ClickHandler;
