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

    $('.js-toque-send').on('click', function(e){
      e.preventDefault();
      var fire = ref.child('messages');
      var toqueArroba = $('.toque-twitter').val();
      var toqueText = $('.toque-message').val();

      fire.push({
        tweetLink: toqueArroba,
        text: toqueText,
      });
    });
  }

  // Create a callback to handle the result of the authentication
  function authHandler(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully with payload:', authData);
    }
  }

  function login(){
    $('.js-admin-login').on('click', function(e){
      e.preventDefault();
      var login = $('.login').val();
      var password = $('.password').val();

      ref.authWithPassword({
        email    : login,
        password : password
      }, authHandler);
    });

    $('.js-admin-logout').on('click', function(e){
      e.preventDefault();
      ref.unauth();
    });
  }

  function register(){
    $('.js-admin-register').on('click', function(e){
      e.preventDefault();
      var login = $('.register').val();
      var password = $('.register-password').val();

      ref.createUser({
        email    : login,
        password : password
      }, function(error) {
        if (error) {
          console.log('Error creating user:', error);
        } else {
          console.log('success');
        }
      });

      ref.onAuth(function(authData) {
        if (authData) {
          ref.child('users').child(authData.uid).set({
            provider: authData.provider,
            email: authData.password.email
          });
        }
      });

    });
  }

  function isAuth(){
    var authData = ref.getAuth();
    if (authData) {
      console.log('Authenticated user with uid:', authData.uid);
      listTweets();
    } else {
      console.log('not logged');
    }
  }

  function listTweets() {
    var listArr = [];
    messages.on('child_added', function(snapshot) {
      var list = snapshot.val();
      listArr.push(list);      
      console.log(listArr);
      var source = $("#list-tweets").html();
      var template = Handlebars.compile(source);
      var html = template(listArr);
      $('#tweetList').html(html);
    });
  }

  $(function () {
    sendToque();
    login();
    register();
    isAuth();
  });

})(jQuery, window, document);
