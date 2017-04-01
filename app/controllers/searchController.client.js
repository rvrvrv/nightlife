/*jshint browser: true, esversion: 6*/
/* global $, FB, localStorage, ajaxFunctions */
'use strict';

const searchBtn = document.querySelector('#searchBtn');
const apiUrl = '/api/list';

//Populate page with search results
function updateResults(data) {
   let list = JSON.parse(data);
   console.log(list);
   list.forEach(e => {
      $('#list').append(e.name+'<br>');
   });
}


//Search for results via GET request
function search(location) {
   //First, ensure search field is populated
   if (!location.trim()) return alert('Please enter a location');
   //Then, perform search
   ajaxFunctions.ajaxRequest('GET', `${apiUrl}/${location}`, updateResults);
}


//Handle search button click...
$('#searchBtn').click(() => search($('#locationInput').val()));

//Handle enter-key submission from search field
$('#locationForm').on('submit', e => {
   e.preventDefault();
   search($('#locationInput').val());
});

