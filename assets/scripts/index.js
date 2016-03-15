'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

const myApp = {
  BASE_URL: 'https://localhost:3000/',
};

const userActions = require('./user-actions.js');
const entryActions = require('./entry-actions');

$(document).ready(() => {
  $('#sign-up').on('submit', userActions.signUp);
  $('#sign-in').on('submit', userActions.signIn);
  $('#sign-out').on('submit', userActions.signOut);
  $('.page2-sign-out').on('click', userActions.signOut);
  $('#change-password').on('submit', userActions.changePassword);
  $('#page2').hide();
  $('#entry-view').on('submit', userActions.createEntry);
});
