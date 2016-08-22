<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="twelve columns">
          <div class="success" v-show="sended">
            <h5>Sucesso! Seu #toque foi colocado para aprovação. :) Se quiser, pode enviar outro toque!</h5>
            <hr>
          </div>
          <form v-on:submit.prevent="tweet">
            <div v-show="!success">
              <label for="tweet-link">Digite a URL do tweet que você deseja dar #Só1Toque</label>
              <input class="u-full-width" type="text" autofocus placeholder="https://twitter.com/MarcusLepage/status/1626015356" v-model="tweeturl" id="tweet-link">
              <p class="error" v-show="!valid">
                <small>URL inválida. Por favor verifique se a URL do tweet esta correta</small>
              </p>
              <p  v-show="valid">
                Sabe aquele amigo que perde a linha no twitter? Que não sabe o limites da interweb? Que não cansa de passar vergonha? Então, todos nós temos um amigo assim. Então que tal dar um #Só1Toque nele pra ele não te causar mais vergonha alheia? Pra isso que estamos aqui! Cole o link do tweet do seu amigo ali em cima e de toque nele! ;)
              </p>
            </div>
            <div v-show="success">
              <label for="tweet-toque">Dê #Só1Toque para o seu amiguinho</label>
              <input class="u-full-width" type="text" maxlength="120" placeholder="Menas, amiga!" v-model="text" id="tweet-toque">
              <p class="error" v-show="!valid">
                erro
              </p>
            </div>
            <div class="buttons">
              <button type="button" name="button" class="button-primary" v-show="success" v-on:click="success = !success">Voltar</button>
              <button class="button-primary" type="button" v-on:click.prevent="submit" v-show="!success">Próximo</button>
              <button class="button-primary" type="submit" v-on:click.prevent="toFirebase" v-show="success">Enviar</button>
            </div>
          </form>

        </div>
      </div>

      <div class="row">
        <div class="twelve columns">
          <tweetembed :html="html" :tweet_content="toque" v-show="success"></tweetembed>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tweetembed from './Embed'
import firebase from 'firebase'

export default {
  components: {
    tweetembed
  },
  data () {
    return {
      tweeturl: '',
      html: '',
      valid: true,
      success: false,
      text: '',
      sended: false,
      firebaseList: []
    }
  },
  computed: {
    'toque': function () {
      let toque = this.text + ' #Só1Toque'
      return toque
    }
  },
  methods: {
    submit: function () {
      this.validate()
    },
    validate: function () {
      let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
      let regex = new RegExp(expression)
      let url = this.tweeturl
      let self = this
      this.sended = false

      this.valid = true
      self.success = false

      if (!url.match(regex)) {
        self.valid = false
        return false
      } else {
        this.tweet()
      }
    },
    tweet: function () {
      let self = this
      this.$http.jsonp(`https://publish.twitter.com/oembed?url=${this.tweeturl}`).then((response) => {
        self.html = response.data.html
        self.success = true
      }, (response) => {
      })
    },
    toFirebase: function () {
      let key = firebase.database().ref().child('/toques').push().key
      let fire = firebase.database().ref('/toques/' + key)
      let self = this

      fire.set({
        'tweetLink': self.tweeturl,
        'text': self.toque,
        'html': self.html,
        'archived': false,
        key
      })
      this.tweeturl = ''
      this.toque = ''
      this.success = false
      this.sended = true
    }
  },
  ready: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide {
  display: none;
}
#tweet {
  display: block;
  height: 100px;
  width: 100%;
}
.error {
  margin-bottom: 0;
}
input {
  background: transparent;
  border: 2px solid white;
  color: white;
}
.success {
  color: white;
  text-align: center;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
section {
  display: flex;
  padding-top: 20vh;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}
form {
  color: white;
}
</style>
