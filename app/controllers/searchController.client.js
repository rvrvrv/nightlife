/*jshint browser: true, esversion: 6*/
/* global $, FB, localStorage, ajaxFunctions */
'use strict';

const searchBtn = document.querySelector('#searchBtn');
const apiUrl = '/api/list';

function updateResults(data) {
   let list = JSON.parse(data);
   console.log(list);
   $('#list').html(list);
}

// ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateResults));


$('#searchBtn').click(() => validateSearch($('#locationInput').val()));
$('#locationForm').on('submit', e => {
   e.preventDefault();
   validateSearch($('#locationInput').val());
});

//Ensure the location field isn't empty
function validateSearch(loc) {
   loc.trim() ? search(loc) : alert('Please enter a location');
}

//Search via AJAX call
function search(location) {
   ajaxFunctions.ajaxRequest('GET', `${apiUrl}/${location}`, updateResults);
}
