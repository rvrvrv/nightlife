/*jshint browser: true, esversion: 6*/
/* global $, FB, localStorage, checkAll */

window.fbAsyncInit = function() {
    FB.init({
        appId: 1845310775708094,
        cookie: true,
        xfbml: true,
        version: 'v2.9'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

//Load the FB SDK asynchronously
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
    else loggedOut();
}

//Called after Login button is clicked
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}


//Update page with logged-in user's info
function loggedIn() {
    FB.api('/me?fields=first_name, last_name, picture', function(user) {
        localStorage.setItem('rv-nightlife-id', user.id);
        $('#userInfo').html(`
        <li><img class="valign left-align" src="${user.picture.data.url}" alt="${user.first_name} ${user.last_name}"></li>
        <li class="hide-on-small-only">${user.first_name}</li>`);
        $('#loginBtn').hide();
        $('#logoutBtn').show();
        $('#logoutLink').removeClass('hidden');
        checkAll(); //Update attendance stats for visible locations
    });
}

//Update page with logged-out view
function loggedOut() {
    localStorage.removeItem('rv-nightlife-id');
    $('#userInfo').empty();
    $('#logoutBtn').hide();
    $('#loginBtn').show();
    $('#logoutLink').addClass('hidden');
    checkAll(); //Update attendance stats for visible locations
}

//Log out the user
$('.logout-buttons').click(() => FB.logout(resp => checkLoginState()));