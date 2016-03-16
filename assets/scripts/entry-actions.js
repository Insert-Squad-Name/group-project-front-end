'use strict'

const myApp = require('./my-app');

const page = require('./page-actions.js');

tinymce.init({
selector: 'textarea',
height: '100%',
width: '100%',
theme: 'modern',
plugins: [
  'advlist autolink lists link image charmap print preview hr anchor pagebreak',
  'searchreplace wordcount visualblocks visualchars code fullscreen',
  'insertdatetime media nonbreaking save table contextmenu directionality',
  'emoticons template paste textcolor colorpicker textpattern imagetools'
],
toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
toolbar2: 'print preview media | forecolor backcolor emoticons',
image_advtab: true,
templates: [
  { title: 'Test template 1', content: 'Test 1' },
  { title: 'Test template 2', content: 'Test 2' }
],
content_css: [
  '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
  '//www.tinymce.com/css/codepen.min.css'
]
});

let createEntry = function(e, pageShow) {
  e.preventDefault();
  let body = tinyMCE.activeEditor.getContent();
  console.log(body);
  $.ajax({
    url: myApp.BASE_URL + '/entries',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {
      '_pageId': myApp.page.pages._id,
      'body': body,
    },
  }).done(function(data) {
    pageShow();
    console.log(data);
    $('#text-editor').hide();
    $('#text-editor-modal').modal('hide');
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

//DELETE ENTRIES
let deleteEntry = function (event, showPage) {
  event.preventDefault();
  $.ajax({
    url: myApp.BASE_URL + '/entries/' + $(event.target).attr("entry-id"),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
  }).done(function() {
    console.log("Successfully deleted entry.");
    showPage();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};


  // display rating
  // let displayEntries = function(response) {
  //   console.log(response);
  //   let entries = response.pages.entries;
  //   console.log('here');
  //   let entryListing = require('../handlebars/show-entries.handlebars');
  //   $('.display-entries').empty();
  //   $('.display-entries').prepend(entryListing({
  //     entries
  //   }));
  // };
  //
  // let showEntries = function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     headers: {
  //       Authorization: 'Token token=' + myApp.user.token,
  //     },
  //     url: myApp.BASE_URL + '/pages/' + $(e.target).attr("data-page-id"),
  //     method: 'GET',
  //     dataType: 'json',
  //   }).done(function(entries){
  //     myApp.page = entries;
  //     displayEntries(entries);
  //   }).fail(function(jqxhr) {
  //     console.log(jqxhr);
  //   });
  // };

module.exports = {
  createEntry,
  deleteEntry,
  // showEntries
};
