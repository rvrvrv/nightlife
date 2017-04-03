'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var yelpSearch = require(path + '/app/controllers/yelpSearch.server.js');

module.exports = function (app) {

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/:id')
		.get(function (req, res) {
			res.json(req.user.facebook);
		});

	app.route('/api/attend/:loc/:id')
		.get(clickHandler.getClicks)
		.post((req, res) => clickHandler.attend(req.params.loc, req.params.id, res))
		.delete(clickHandler.resetClicks);
	
	app.route('/api/list/:loc')
		.get(function(req, res) { //Search via Yelp Fusion API
			yelpSearch(req.params.loc, res);
		});
};
