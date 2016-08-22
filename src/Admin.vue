<template>
  <sidebar></sidebar>
  <login v-if="!logged"></login>
  <admin v-else></admin>
</template>

<script>
import Sidebar from './components/Sidebar'
import Admin from './components/AdminList'
import Login from './components/LoginForm'
import firebase from 'firebase'

export default {
  components: {
    Admin,
    Sidebar,
    Login
  },
  data () {
    return {
      msg: 'Hello World!',
      logged: false
    }
  },
  events: {
    'logged': function (boolean) {
      console.log(boolean, 'logged event')
      this.logged = boolean
    }
  },
  ready: function () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.logged = true
      } else {
        self.logged = false
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  background-color: #2698d4;
  font-family: 'Lato', sans-serif;
}
section {
  width: 70%;
}
</style>
