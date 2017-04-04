/*jshint browser: true, esversion: 6*/
/* global $, ajaxFunctions, FB, localStorage, Materialize */
'use strict';

const $btn = $('#searchBtn');
const goingLink = '&nbsp;<i class="fa fa-2x fa-star"></i>&nbsp;Going!';
const attendLink = 'Attend&nbsp;<i class="fa fa-2x fa-star-o"></i>';
let lastSearch = '';

//Populate page with search results
function displayBusinesses(data) {
   let list = JSON.parse(data);
   let userId = localStorage.getItem('rv-nightlife-id') || null;
   console.log(list);
   //Clear previous search results
   $('#results').empty();
   list.forEach((e, i) => {
      //Convert and round distance (in meters) to miles
      let distance = (e.distance * 0.000621371192).toFixed(1);
      //Get attendance stats	
   	ajaxFunctions.ajaxRequest('GET', `/api/attend/${e.id}/${userId}`, stats => {
   	   console.log(stats);
   	   //To do: If attendees, show 'going' stat
   	   //If user attending, show 'going' link
         //Animate each result entrance
         setTimeout(() => {
         $('#results').append(`
               <div class="col m6 l3 animated flipInX">
                  <div class="card small black">
                     <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${e.image_url}" alt="${e.name}">
                     </div>
                     <div class="card-content black">
                        <span class="card-title activator white-text">${e.name}
                        <i class="material-icons right">more_vert</i></span>
                        <p>${distance} mi.<a class="attendLink right" id="${e.id}"
                           href="javascript:;" onclick="attend(this, true)">Attend&nbsp;<i class="fa fa-2x fa-star-o"></i></a></p>
                      </div>
                      <div class="card-reveal black">
                        <span class="card-title white-text">${e.name}
                        <i class="material-icons right">close</i></span>
                        <p>${e.location.display_address.join('<br>')}
                           <br><a href="tel:${e.phone}" target="_blank">${e.display_phone}</a>
                        </p>
                        <p><a class="yelp" href="${e.url}" target="_blank">View on Yelp&nbsp;<i class="fa fa-2x fa-yelp"></i></a></p>
                      </div>
                    </div>
                 </div>
            `);
         }, i * 100);
   	});
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
   ajaxFunctions.ajaxRequest('GET', `/api/list/${location}`, displayBusinesses);
   lastSearch = location.trim().toLowerCase();
}

//Display user and guest attendance for each business
function updateAttending(data) {
   let results = JSON.parse(data);
   console.log(results);
   //Update link text and action based on attendance
   if (results.action === 'attending') {
      $(`#${results.location}`).html(goingLink);
      $(`#${results.location}`).attr('onclick', 'attend(this)');
   }
   else {
      $(`#${results.location}`).html(attendLink);
      $(`#${results.location}`).attr('onclick', 'attend(this, true)'); 
   }
}

//Handle attend link click
function attend(link, interested) {
   let userId = localStorage.getItem('rv-nightlife-id');
   //First, check to see if user is logged in
   if (!userId) {
      $('.fb-buttons').addClass('shake');
      setTimeout(() => $('.fb-buttons').removeClass('shake'), 1000);
      return Materialize.toast('Please log in to attend events', 2000, 'error');
   }
   //Then, update the database (attend or unattend the location)
   let method = interested ? 'PUT' : 'DELETE';
   ajaxFunctions.ajaxRequest(method, `/api/attend/${link.getAttribute('id')}/${userId}`, updateAttending);
}

//Handle search button click
$btn.click(() => search($('#locationInput').val()));

//Handle enter-key submission from search field
$('#locationForm').on('submit', e => {
   e.preventDefault();
   search($('#locationInput').val());
});

