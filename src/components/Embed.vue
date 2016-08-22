<template>
  <div class="tweet">
    <div class="media">
      <div class="author">
        <div class="avatar">
          <img src="../assets/logo.svg" alt="" />
        </div>
        <div class="infos">
          <h5>Só1Toque</h5>
          <a href="https://twitter.com/so1toque">@Só1Toque</a>
        </div>
      </div>
      <div class="content">
        <p>
          {{tweet_content}}
        </p>
      </div>
    </div>
    {{{html}}}
  </div>
</template>

<script>
export default {
  props: ['html', 'tweet_content'],
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.media {
  display: flex;
  flex-direction: column;
}
.author {
  display: flex;
  width: 100%;
}
.infos h5 {
  display: block;
  padding-top: 2px;
  margin-top: 3px;
  font-size: 18px;
  line-height: 1.25;
  margin-bottom: 0;
}
.infos a {
  color: #8899a6;
}
.infos a:hover {
  color: #8899a6;
}
.content p {
  font-size: 26px;
  line-height: 32px;
  font-weight: 300;
  letter-spacing: .01em;
}
.avatar {
  width: 48px;
  padding-right: 40px;
}
.avatar img {
  width: 100%;
  height: auto;
}
.tweet {
  padding: 20px;
  border-radius: 5px;
  background-color: white;
}
.twitter-tweet {
  border: solid 1px #e1e8ed;
  border-radius: 4px;
  padding: 10px;
  margin: 0;
}
.twitter-tweet p {
  margin-bottom: 1em;
  line-height: 1;
}
</style>
