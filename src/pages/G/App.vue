<template>
  <div id="app">
    
    <div class="join-page" v-if="actView === 'invited'">
      <div class="container">
        <h1 class="title">You’re about to join SOMEONE Game</h1>
        <div class="block">
          <b-radio v-model="radio"
              name="name"
              native-value="Flint">
            <img src="@/assets/1F973.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="radio"
              name="name"
              native-value="Silver">
            <img src="@/assets/1F929.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="radio"
              name="name"
              native-value="Jack">
            <img src="@/assets/1F61C.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="radio"
              name="name"
              native-value="Vane">
            <img src="@/assets/1F911.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="radio"
              name="name"
              native-value="Bok">
            <img src="@/assets/1F92F.svg" alt="emoji">
          </b-radio>
        </div>
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

    <div class="join-page" v-if="actView === 'owner'">
      <div class="container">
        <h1 class="title">You’re about to join YOUR Game</h1>
        <div class="block">
          <b-radio v-model="radio"
              name="name"
              native-value="Flint">
            <img src="@/assets/1F973.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="radio"
              name="name"
              native-value="Silver">
            <img src="@/assets/1F929.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="radio"
              name="name"
              native-value="Jack">
            <img src="@/assets/1F61C.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="radio"
              name="name"
              native-value="Vane">
            <img src="@/assets/1F911.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="radio"
              name="name"
              native-value="Bok">
            <img src="@/assets/1F92F.svg" alt="emoji">
          </b-radio>
        </div>
        <b-field label="What's Your Name?">
            <b-input v-model="name"></b-input>
        </b-field>
        <div class="block">
          <b-button type="is-success">Join Game</b-button>
        </div>
      </div>
    </div>

    <div class="control-page" v-if="actView === 'cntrl'">
      <div class="container">
        <div class="block">
          <h1 class="title">This is your game</h1>
        </div>
        <div class="block">
          <ul>
            <li class="players" v-for="player in players" :key="player.name">
              <div>
                <img width="50px" height="50px" :src="player.emoji" alt="emoji">
              </div>
              <div>
                <span class="name">{{ player.name }}</span>
                <span class="score">{{ player.score }}</span>
              </div>
              <div class="kick">
                <a href="#">
                  <b-icon
                  pack="fas"
                  icon="times">
                  </b-icon>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="block">
          <b-button type="is-success">Start Next Round</b-button>        
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'G',
  data() {
    return {
      name: 'Rose',
      radio: 'Jack',
      pId: '',
      actView: '',
      players: [
        { name: 'Bob', emoji: require('../../assets/1F973.svg'), score: '50pts' },
        { name: 'Mia', emoji: require('../../assets/1F929.svg'), score: '30pts' },
        { name: 'Anna', emoji: require('../../assets/1F61C.svg'), score: '30pts' },
        { name: 'Elli', emoji: require('../../assets/1F911.svg'), score: '30pts' },
        { name: 'Todd', emoji: require('../../assets/1F92F.svg'), score: '30pts' }
      ]
    }
  },
  components: {
  },
  created: function () {
    let pageURL = window.location.href
    let loc = pageURL.indexOf('g?=')
    let pId
    if (loc === -1) {
      pId = null
    } else {
      pId = pageURL.substr(loc + 3, 5)
    }
    this.pId = pId
    if ((this.pId === 'owner') || (this.pId === 'cntrl')) {
      this.actView = this.pId
    } else {
      this.actView = 'invited'
    }
    console.log(this.pId);
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
.b-radio.radio .control-label{
  height: 40px;
  width: 40px;
  padding-left: 0 !important;
}
.players {
  display: flex;
  margin: 0 auto;
  width: fit-content;
}
.players .name { display: block; font-weight: 600;}
.players .score { display: block;}
</style>
