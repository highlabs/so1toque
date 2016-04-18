/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2016. MIT licensed.
 */
(function ($, window, document, undefined) {

  'use strict';

  var ref = new Firebase('https://so1toque.firebaseio.com/');
  var messages = new Firebase('https://so1toque.firebaseio.com/messages');

  function sendToque(){

    $('.toque-form').on('submit', function(){
      var fire = ref.child('messages');
      $('.toque-form').find('.js-toque-send').addClass('is-loading').attr('disabled', true);
      var toqueArroba = $('.toque-twitter').val().toString();
      var toqueText = $('.toque-message').val().toString();

      var message = fire.push();
      message.set({
        "tweetLink": toqueArroba,
        "text": toqueText,
      });

      $('.toque-form').find('.js-toque-send').removeClass('is-loading').prop('disabled', false);
      return false;
    });
  }

  function isAuth(){
    var authData = ref.getAuth();
    if (authData) {
      return true;
    } else {
      return false;
    }
  }

  function adminInit() {
    $('.login-navbar').removeClass('hide');
    $('.logout-navbar').removeClass('hide');
    if (isAuth()) {
      listTweets();
      $('.login-navbar').addClass('hide');
    } else {
      $('.logout-navbar').addClass('hide');
    }
  }

  function authHandler(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully with payload:', authData);
      adminInit();
    }
  }

  function login(){
    $('.toque-login').on('submit', function(){
      var login = $('.login').val();
      var password = $('.password').val();

      ref.authWithPassword({
        email    : login,
        password : password
      }, authHandler);
      return false;
    });

    $('.toque-logout').on('submit', function(e){
      e.preventDefault();
      ref.unauth();
      adminInit();
      $('#tweetList').html('');
      return false;
    });
  }

  function register(){
    $('.toque-register').on('submit', function(e){
      e.preventDefault();
      var login = $('.register').val();
      var password = $('.register-password').val();

      ref.createUser({
        email    : login,
        password : password
      }, function(error,authData) {
        if (error) {
          console.log('Error creating user');
        } else {
          ref.child('users').child(authData.uid).set({
            email: login
          });
        }
      });
      return false;
    });
  }

  function handleTemplate(data){
    var source = $('#list-tweets').html();
    var template = Handlebars.compile(source);
    var html = template(data);
    $('#tweetList').html(html);
  }

  function listTweets() {
    var listArr = [];
    messages.on('child_added', function(snapshot) {
      $('#tweetList').html('');
      var list = snapshot.val();
      var key = snapshot.key();
      listArr.push(list);
      // console.log(list);
      list.id = key;
      handleTemplate(listArr);
    });
    messages.on('child_removed', function(snapshot) {
      var key = snapshot.key();
      $('[data-key='+key+']').closest('.media').fadeOut();
    });
  }

  function acceptTweet(){
    $(document).on('click', '.js-toque-accept', function(){
      var url = $(this).data('url');
      var text = $(this).data('text');
      var key = $(this).data('key');

      var statusUrlTest = new RegExp('/^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i');

      if (!statusUrlTest.test(url)) {
        console.log('narf');
        // return false;
      }

      var data = {
        "text": text,
        "url": url
      };

      $.ajax({
        url: 'https://whispering-ridge-55853.herokuapp.com/update',
        type: 'POST',
        data: data,
      })
      .done(function(status) {
        console.log(status);
      });

      messages.child(key).remove();
    });
  }

  function declineTweet(){
    $(document).on('click', '.js-toque-decline', function(){
      var key = $(this).data('key');
      messages.child(key).remove();
    });
  }

  var umToque;
  var UTIL = {

    fire : function(func,funcname, args){

      var namespace = umToque;  // indicate your obj literal namespace here

      funcname = (funcname === undefined) ? 'init' : funcname;
      if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function'){
        namespace[func][funcname](args);
      }

    },

    loadEvents : function(){

      var bodyId = document.body.id;

      // hit up common first.
      UTIL.fire('common');

      // do all the classes too.
      $.each(document.body.className.split(/\s+/),function(i,classnm){
        UTIL.fire(classnm);
        UTIL.fire(classnm,bodyId);
      });

      UTIL.fire('common','finalize');

    }

  };


  $(function () {
    $(document).ready(UTIL.loadEvents);
    umToque = {
      home : {
        init     : function(){
          sendToque();
        }
      },
      admin : {
        init     : function(){
          adminInit();
          login();
          register();
          isAuth();
          declineTweet();
          acceptTweet();
        }
      }
    }
  });

})(jQuery, window, document);
