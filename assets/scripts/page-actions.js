'use strict';

const myApp = require('./my-app');

const entryActions = require('./entry-actions.js');
const pageSwitch = require('./switch-pages');

/* HELPER FUNCTIONS */
let formatEntries = function (entries) {
  entries.reverse();
  entries.forEach(function(cV, i, a) {
    let ISOdate = new Date(cV.createdAt);
     cV.createdAt = ISOdate.toLocaleString();
  });
  return entries;
};


let displayPages = function(response) {
  let pages = formatEntries(response.pages);
  console.log(response.pages);
  let pagesTemplate = require('../handlebars/directory-pages.handlebars');
  $('.pages-collection').html(pagesTemplate({pages}));
};

let pageIndex = function() {
  $.ajax({
    url: myApp.BASE_URL + '/pages',
    method: 'GET',
    dataType: 'json',
  }).done(function(pages) {
    console.log(pages);
    displayPages(pages);
  }).fail(function(jqxhr) {
    console.log(jqxhr);
  });
};

let pageUserIndex = function() {
  $.ajax({
    url: myApp.BASE_URL + '/pages/user/' + myApp.user._id,
    method: 'GET',
    dataType: 'json',
  }).done(function(pages) {
    console.log(pages);
    displayPages(pages);
  }).fail(function(jqxhr) {
    console.log(jqxhr);
  });
};

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
    pageUserIndex();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let displayEntries = function(response) {
  let entries = formatEntries(response.pages._entries);
  let entryListing = require('../handlebars/show-entries.handlebars');
  $('.display-entries').empty();
  $('.display-entries').append(entryListing({
    entries
  }));
};

let pageShow = function(e) {

  let pageId;

  //if event is pased, get page assocaited with page click;
  //if no event, assume page to get is current page.
  if (e) {
    e.preventDefault();
    pageId = $(e.target).attr("data-page-id");
  } else {
    pageId = myApp.page.pages._id;
  }

  $.ajax({
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    url: myApp.BASE_URL + '/pages/' + pageId,
    method: 'GET',
    dataType: 'json',
  }).done(function(page) {
    myApp.page = page;
    console.log(page);
    pageSwitch.page3Handler();
    displayEntries(page);
  }).fail(function(jqxhr) {
    console.log(jqxhr);
  });
};

//DELETE BUTTON
let deletePage = function (event) {
  event.preventDefault();
  $.ajax({
    url: myApp.BASE_URL + '/pages/' + $(event.target).attr("data-delete-page"),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
  }).done(function() {
    console.log("Successfully deleted page.");
    pageUserIndex();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

/* HELPER FUNCTIONS */
let formatEntries = function (entries) {
  entries.reverse();
  entries.forEach(function(cV, i, a) {
    let ISOdate = new Date(cV.createdAt);
     cV.createdAt = ISOdate.toLocaleString();
  })
  return entries;
};




module.exports = {
  pageCreate,
  deletePage,
  pageIndex,
  pageUserIndex,
  pageShow,
};
