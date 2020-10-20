<template>
  <div class="container">
    <h1>FriendlyAppName</h1>
    <h2>Share this lin link your friends:</h2>
    <b-field label="Game link">
        <b-input id="gamelink" v-model="gamelink" readonly=""></b-input>
    </b-field>
    <b-button type="is-link" @click="copyLink()">Copy Link</b-button><br>
    <b-button type="is-success" @click="goToGame()" @>Join Game</b-button>
  </div>
</template>

<script>
export default {
  name: 'CreatedCompo',
  props: {
    msg: String
  },
  data() {
    return {
      // gamelink: window.location.href'https://playpickio.com/12345',
    }
  },
  methods: {
    copyLink () {
      let getGamelinkcontainer = document.getElementById('gamelink')
      getGamelinkcontainer.select()
      document.execCommand('Copy')
    },
    goToGame () {
      window.location.href = this.gamelink
    }
  },
  computed: {
    gamelink: function () {
      return window.location.href + 'g?=12345'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #gamelink { text-align: center;}
</style>
