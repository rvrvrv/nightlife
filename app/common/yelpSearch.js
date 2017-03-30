'use strict';

const yelp = require('yelp-fusion');

const searchRequest = {
  term:'nightlife',
  location: '60090' //TO DO: Replace with user's search term
};

yelp.accessToken(process.env.YELP_APP_ID, process.env.YELP_APP_SECRET).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});