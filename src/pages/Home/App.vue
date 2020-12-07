<template>
  <div id="app">
    <template v-if="nowView === 'creator'">
      <div class="container">
        <h1 class="title">FriendlyAppName</h1>
        <b-field label="Give it a name">
            <b-input v-model="game_name"></b-input>
        </b-field>
        <b-field>
          <b-switch v-model="usePass">Password protected?</b-switch>
        </b-field>
        <b-field v-if="usePass" label="Password">
            <b-input type="password"
                value="iwantmytreasure"
                password-reveal>
            </b-input>
        </b-field>
        <b-button type="is-success" @click="createGame()">Create game</b-button>
      </div>
    </template>
    <template v-if="nowView === 'created'">
      <div class="container">
        <h1>{{ this.game_name }}</h1>
        <h2>Share this lin link your friends:</h2>
        <b-field label="Game link">
            <b-input id="gamelink" v-model="gamelink" readonly=""></b-input>
        </b-field>
        <b-button type="is-link" @click="copyLink()">Copy Link</b-button><br>
        <b-button type="is-success" @click="goToGame()" @>Join Game</b-button>
      </div>
    </template>
    <!-- <CreatedCompo
      v-if="nowView === 'created'"
    /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import CreatedCompo from '@/components/CreatedCompo.vue'

export default {
  name: 'Home',
  data() {
    return {
      usePass: false,
      value: null,
      game_name: 'Matt',
      nowView: 'creator',
    }
  },
  components: {
    // CreatedCompo
  },
  sockets: {
    connect() {
      console.log("connected");
    },
    game_name(data) {
      console.log(data);
      this.game_name = data;
    }
  },
  methods: {
    createGame () {
      this.$socket.client.emit('game_name', this.game_name);
      this.nowView = 'created'
    },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  max-width: 340px !important;
}
</style>
