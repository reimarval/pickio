<template>
  <div id="app">
    <div class="container">
      <h1>You’re about to join SOMEONE Game</h1>
      <b-field label="What's Your Name?">
          <b-input v-model="name"></b-input>
      </b-field>
      <b-field label="Password please...">
          <b-input type="password"
              value="iwantmytreasure"
              password-reveal>
          </b-input>
      </b-field>
      <b-button type="is-success">Join Game</b-button>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'G',
  data() {
    return {
      name: 'Rose'
    }
  },
  components: {
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
  max-width: 320px;
}
</style>
