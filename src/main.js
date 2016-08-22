var Vue = require('vue')
var VueRouter = require('vue-router')
var VueResource = require('vue-resource')
import firebase from 'firebase'
import config from './config'

firebase.initializeApp(config)

Vue.use(VueResource)
Vue.use(VueRouter)

import Home from './Home'
import Admin from './Admin'

// create App instance
var App = Vue.extend({})

// create Router instance
var router = new VueRouter()

// add your routes and their components
router.map({
  '/': {
    component: Home
  },
  '/admin': {
    component: Admin
  }
})

router.start(App, '#app')
