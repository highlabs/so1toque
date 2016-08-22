<template>
  <section>
    <h1 v-if="toquesList == null">Nada pra aprovar</h1>
    <div class="tweet-list" v-for="toques in toquesList">
      <tweet-embed :html="toques.html" :tweet_content="toques.text"></tweet-embed>
      <div class="buttons">
        <button class="button-primary" type="button" v-on:click="aproved(toques)">Aprovar</button>
        <button class="button-reproved" type="button" v-on:click="reproved(toques)">Reprovar</button>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import TweetEmbed from './Embed'

export default {
  components: {
    TweetEmbed
  },
  data () {
    return {
      toquesList: []
    }
  },
  methods: {
    aproved: function (data) {
      let tweet = JSON.parse(JSON.stringify(data))
      // let self = this
      let fire = firebase.database().ref('/aprovados/' + tweet.key)
      let oldFire = firebase.database().ref('/toques/' + tweet.key)

      let tweetInfos = {
        'url': tweet.tweetLink,
        'text': tweet.text + '#Só1Toque'
      }
      console.log(tweet.text)
      this.$http.post('https://whispering-ridge-55853.herokuapp.com/update', tweetInfos).then((response) => {
        fire.set(data)
        oldFire.remove()
      }, (response) => {
        // window.alert('Erro olha no log')
        console.log(response)
      })
    },
    reproved: function (data) {
      let tweet = JSON.parse(JSON.stringify(data))
      let fire = firebase.database().ref('/reprovados/' + tweet.key)
      let oldFire = firebase.database().ref('/toques/' + tweet.key)

      fire.set(data)
      oldFire.remove()
    }
  },
  ready: function () {
    let self = this
    firebase.database().ref('toques').on('value', function (snapshot) {
      self.toquesList = snapshot.val()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttons {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}
.tweet-list {
  max-width: 500px;
  width: 100%;
  margin-top: 60px;
}
.button-reproved {
  background-color: #f03333;
  color: white;
  border: 0px;
}
</style>
