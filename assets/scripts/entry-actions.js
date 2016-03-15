'use strict';

const myApp = require('./my-app');

tinymce.init({
selector: 'textarea',
//   setup: function (editor) {
//         editor.on('change', function () {
//             editor.save();
//         });
//     }
// });
height: 500,
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


let createEntry = function(e) {
  e.preventDefault();
  let body = tinyMCE.activeEditor.getContent();
  $.ajax({
    url: myApp.BASE_URL + '/entries',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {
      'body': body,
    },
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = {
  createEntry
};
