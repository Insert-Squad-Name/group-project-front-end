'use strict';

const myApp = require('./my-app.js');


let page2Handler = function () {
  $('#page2').show();
  $('#page1').hide();
};

let page1Handler = function () {
  $('#page1').show();
  $('#page2').hide();
};

let signUp = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: myApp.BASE_URL + '/sign-up',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let signIn = function(e) {
  console.log(myApp.BASE_URL);
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: myApp.BASE_URL + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
    $('#sign-in-modal').modal('hide');
    page2Handler();
    console.log(data.user);
    myApp.user = data.user;
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let changePassword = function(e) {
  e.preventDefault();
  if (!myApp.user) {
    throw ('No user signed in');
  }
  let formData = new FormData(e.target);
  $.ajax({
    url: myApp.BASE_URL + '/change-password/' + myApp.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let signOut = function(e) {
  e.preventDefault();
  if (!myApp.user) {
    throw('No user signed in');
  }
  $.ajax({
    url: myApp.BASE_URL + '/sign-out/' + myApp.user._id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
  }).done(function() {
    console.log('You have logged out');
    page1Handler();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let createEntry = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: myApp.BASE_URL + '/entries',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  createEntry
};
