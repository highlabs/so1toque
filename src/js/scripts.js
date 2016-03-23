(function ($, window, document, undefined) {

  'use strict';

  function sendToque(){
    var fireurl = new Firebase("https://so1toque.firebaseio.com/");

    $('.js-toque-send').on('click', function(e){
      e.preventDefault();
      var fire = fireurl.child("users");
      var toqueArroba = $('.toque-twitter').val();
      var toqueText = $('.toque-message').val();
      fire.push({
        tweetLink: toqueArroba,
        text: toqueText,
      });
    });
  }

  $(function () {
    sendToque();
  });

})(jQuery, window, document);
