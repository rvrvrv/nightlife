/*jshint browser: true, esversion: 6*/
/* global $, FB, localStorage, ajaxFunctions */
'use strict';

const searchBtn = document.querySelector('#searchBtn');
const apiUrl = '/api/list';

function updateResults(data) {
   let list= JSON.parse(data);
   $('#list').html(list);
}

// ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateResults));

$('#searchBtn').click(() => search($('#locationInput').val()));

function search(location) {
   ajaxFunctions.ajaxRequest('GET', `${apiUrl}/${location}`, () => {
      // ajaxFunctions.ajaxRequest('GET', apiUrl, updateResults);
   });
}
