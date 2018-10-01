const yelp = require('yelp-fusion');

function search(reqLocation, res) {
  const client = yelp.client(process.env.YELP_API_KEY);
  const searchRequest = {
    term: 'nightlife',
    location: reqLocation
  };

  client
    .search(searchRequest)
    .then(response => res.json(response.jsonBody.businesses))
    .catch(e => console.error(e));
}

module.exports = search;
