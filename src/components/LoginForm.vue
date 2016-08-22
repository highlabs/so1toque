<template>
  <form v-on:submit.prevent="login">
    <div class="row">
      <div class="twelve columns">
        <label for="email">Email</label>
        <input class="u-full-width" type="text" v-model="email" id="email">
      </div>
    </div>
    <div class="row">
      <div class="twelve columns">
        <label for="senha">Digite o toque que você quer dar no amiguinho</label>
        <input class="u-full-width" type="password" v-model="pass" id="senha">
      </div>
    </div>
    <button class="button-primary" type="submit">Enviar</button>
  </form>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      email: '',
      pass: ''
    }
  },
  methods: {
    login: function () {
      let self = this
      firebase.auth().signInWithEmailAndPassword(this.email, this.pass).then(function (response) {
        console.log(response)
        self.$dispatch('login', true)
      }, function (error) {
        self.$dispatch('login', false)
        console.log(error)
      })
    }
  },
  ready: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
