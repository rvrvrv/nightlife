'use strict';

const yelp = require('yelp-fusion');

function search(reqLocation, res) {
  let searchRequest = {
    term: 'nightlife',
    location: '60090' //TO DO: Replace with user's search term (reqLocation arg)
  };
  yelp.accessToken(process.env.YELP_APP_ID, process.env.YELP_APP_SECRET).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      console.log(response);
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
      res.json(prettyJson);
    });
  }).catch(e => {
    console.log(e);
  });
}

module.exports = search;
