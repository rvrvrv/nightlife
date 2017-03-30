/*jshint browser: true, esversion: 6*/
/* global $, ajaxFunctions */

window.fbAsyncInit = function() {
    FB.init({
        appId: 1845310775708094,
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

// Load the FB SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//Check for login status change
function statusChangeCallback(response) {
    if (response.status === 'connected') loggedIn();
    else document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
}

// Called after Login button is clicked
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}


// Update page with logged-in user's info
function loggedIn() {
    FB.api('/me?fields=first_name, last_name, picture', function(response) {
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.first_name + '!';
    });
}
