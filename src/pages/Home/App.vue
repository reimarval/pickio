<template>
  <div id="app">
    <template v-if="nowView === 'creator'">
      <div class="container">
        <h1 class="title">FriendlyAppName</h1>
        <b-field label="Give it a name">
            <b-input v-model="name"></b-input>
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
    <CreatedCompo
      v-if="nowView === 'created'"
    />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import CreatedCompo from '@/components/CreatedCompo.vue'

export default {
  name: 'Home',
  data() {
    return {
      usePass: false,
      value: null,
      name: 'Matt',
      nowView: 'creator',
    }
  },
  components: {
    CreatedCompo
  },
  methods: {
    createGame () {
      this.nowView = 'created'
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
