// 'use strict';
//
// const myApp = {
//   BASE_URL: 'https://localhost:3000',
// };
//
//
// let createEntry = function(e) {
//   e.preventDefault();
//   let formData = new FormData(e.target);
//   $.ajax({
//     url: myApp.BASE_URL + '/entries',
//     method: 'POST',
//     headers: {
//       Authorization: 'Token token=' + myApp.user.token,
//     },
//     contentType: false,
//     processData: false,
//     data: formData,
//   }).done(function(data) {
//     console.log(data);
//   }).fail(function(jqxhr) {
//     console.error(jqxhr);
//   });
// };
//
// module.exports = {
//   createEntry
// };
