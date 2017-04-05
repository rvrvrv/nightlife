'use strict';

var Locations = require('../models/locations.js');

function ClickHandler() {

	this.checkAttendees = function(reqLoc, reqUser, res) {
		Locations
			.findOne({
				'location': reqLoc
			}, {
				_id: 0,
				__v: 0
			})
			.exec(function(err, result) {
				if (err) throw err;
				console.log(result);
				res.json(result);
			});
	};

	//Add user to list of attendees
	this.attend = function(reqLoc, reqUser, res) {
		Locations
			.findOneAndUpdate({
				'location': reqLoc
			}, {
				$addToSet: {
					'attendees': reqUser
				},
			}, {
				upsert: true,
				new: true
			})
			.exec(function(err, result) {
				if (err) throw err;
				res.json({
					location: result.location,
					total: result.attendees.length,
					action: 'attending'
				});
			});
	};

	//Remove user from list of attendees
	this.unAttend = function(reqLoc, reqUser, res) {
		Locations
			.findOneAndUpdate({
				'location': reqLoc
			}, {
				$pull: {
					'attendees': reqUser
				}
			}, {
				new: true
			})
			.exec(function(err, result) {
				if (err) throw err;
				//If no one is attending, delete the document
				if (!result.attendees.length) result.remove();
				res.json({
					location: result.location,
					total: result.attendees.length,
					action: 'not attending'
				});
			});
	};

}


module.exports = ClickHandler;
