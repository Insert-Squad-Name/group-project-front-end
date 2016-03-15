'use strict';

const myApp = require('./user-actions.js').myApp;

let pageCreate = function(e) {
  e.preventDefault();
  // console.log(e);
  let formData = new FormData(e.target);
  $.ajax({
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    url: myApp.BASE_URL + '/pages',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
    $('#create-page-modal').modal('hide');
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};


module.exports = {
  pageCreate
};
