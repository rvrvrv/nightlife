/*jshint browser: true, esversion: 6*/
/* global $, ajaxFunctions, FB, localStorage, Materialize */
'use strict';

const apiUrl = '/api/list';
const $btn = $('#searchBtn');
let lastSearch = '';

//Populate page with search results
function updateResults(data) {
   let list = JSON.parse(data);
   console.log(list);
   //Clear previous search results
   $('#list').empty();
   list.forEach(e => {
      //Convert and round distance (in meters) to miles
      let distance = (e.distance * 0.000621371192).toFixed(1);
      $('#list').append(`
         <div class="col m6 l3">
            <div class="card small black">
               <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${e.image_url}" alt="${e.name}">
               </div>
               <div class="card-content black">
                  <span class="card-title activator white-text">${e.name}
                  <i class="material-icons right">more_vert</i></span>
                  <p>${distance} mi.</p>
                  <p><a href="#">I'm going</a></p>
                </div>
                <div class="card-reveal black">
                  <span class="card-title white-text">${e.name}
                  <i class="material-icons right">close</i></span>
                  <p>${e.location.display_address.join('<br>')}
                     <br><a href="tel:${e.phone}" target="_blank">${e.display_phone}</a>
                  </p>
                  <p><a class="yelp" href="${e.url}" target="_blank">View on Yelp <i class="fa fa-2x fa-yelp"></i></a></p>
                </div>
              </div>
           </div>
      `);
   });
   $btn.removeClass('disabled');
	$btn.html('Search');
}


//Search for results via GET request
function search(location) {
   //First, ensure search field is populated
   if (!location.trim()) return Materialize.toast('Please enter a valid location', 3000, 'error');
   //Then, ensure user entered a new location (to prevent duplicate requests)
   if (location.trim().toLowerCase() === lastSearch) return Materialize.toast('Please enter a new location', 3000, 'error');
   //If a new valid location was entered, perform the search
   $btn.addClass('disabled');
	$btn.html('<i class="fa fa-spinner fa-spin fa-fw"></i>&nbsp;Searching');
   ajaxFunctions.ajaxRequest('GET', `${apiUrl}/${location}`, updateResults);
   lastSearch = location.trim().toLowerCase();
}


//Handle search button click
$btn.click(() => search($('#locationInput').val()));

//Handle enter-key submission from search field
$('#locationForm').on('submit', e => {
   e.preventDefault();
   search($('#locationInput').val());
});
