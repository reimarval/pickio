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

    <div class="control-page" v-if="actView === 'control'">
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
                <span class="score">{{ player.score }}pts</span>
              </div>
              <div class="kick">
                <a href="" class="delete"></a>
              </div>
            </li>
          </ul>
        </div>
        <div class="block">
          <b-button type="is-success">Start Next Round</b-button>        
        </div>
        <div class="block">
          <h2>Share this lin link your friends:</h2>
          <b-field label="Game link">
              <b-input id="gamelink" v-model="gamelink" readonly=""></b-input>
          </b-field>
          <b-button type="is-link" @click="copyLink()">Copy Link</b-button><br>
        </div>
      </div>
    </div>

    <div class="lobby-page" v-if="actView === 'lobby'">
      <div class="container">
        <div class="block">
          <h2 class="subtitle" style="color:#f14668">Waiting for *creator* to start the next round</h2>
        </div>
        <div class="block">
          <h1 class="title">Round 1</h1>
        </div>
        <div class="block">
          <div>
            <h3 class="gamemode title is-3">Popular Pick Wins</h3>
          </div>
        </div>
        <div class="block">
          <ul>
            <li class="players" v-for="player in players" :key="player.name">
              <b-progress class="drunkmeter" :type="drunkCalc(player.score)" :value="player.score"></b-progress>
              <div>
                <img width="50px" height="50px" :src="player.emoji" alt="emoji">
              </div>
              <div>
                <span class="name">{{ player.name }}</span>
                <span class="score">{{ player.score }}pts</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="block">
          <button class="button" disabled>
            Spend Points
          </button>
        </div>
      </div>
    </div>

    <div class="round-page" v-if="actView === 'round'">
      <div class="container">
        <div class="columns">
          <div class="column" style="text-align: left;">
            <h1 class="title">Round 1</h1>
            <h2 class="subtitle gamemode">Popular Pick</h2>
          </div>
          <div class="column" style="text-align: -webkit-right;">
            <radial-progress-bar
              :diameter="80"
              :completed-steps="countDown"
              :total-steps="totalSteps"
              :is-clockwise="false"
              :inner-stroke-color="'#F6F6EF'"
              :start-color="'#EB5757'"
              :stop-color="'#EB5757'"
            >
              <p class="has-text-weight-semibold">{{ countDown }}</p>
              <p>secs</p>
            </radial-progress-bar>
          </div>
        </div>
        <div class="columns" v-for="i in optionsColumns" :key="i">
          <div class="column" v-for="i in optionsRows" :key="i">
            <figure class="media-content">
              <p class="image is-100x100">
                <a href="">
                  <b-skeleton circle width="100px" height="100px"></b-skeleton>
                </a>
              </p>
            </figure>
          </div>
        </div>
      </div>
    </div>

    <div class="result-page" v-if="actView === 'result'">
      <div class="container">

        <div class="block dev-select">
          <b-field label="Dev View Selector">
              <b-select placeholder="Select a state" v-model="resultState">
                  <option value="win">Win</option>
                  <option value="loss">Loss</option>
                  <option value="mia">Didn't Answer</option>
              </b-select>
          </b-field>
        </div> 

        <template v-if="resultState === 'win'">
          <div class="block">
            <h2 class="subtitle gamemode">Popular Pick</h2>
            <h1 class="title">Good Choice</h1>
            <h4 class="subtitle is-4">You win this round!</h4>
          </div>
          <div class="block">
            <figure class="media-content">
              <p class="image is-200x200">
                <a href="">
                  <b-skeleton circle width="200px" height="200px"></b-skeleton>
                </a>
              </p>
            </figure>
          </div>
          <div class="block" style="margin-bottom: 50px;">
            <h1 class="title has-text-weight-bold is-uppercase" style="color:#00D73C">Winner pick</h1>
            <h5 class="subtitle"><span class="has-text-weight-bold">+10</span> points for you</h5>
          </div>
          <div class="block">
            <ul>
              <li class="players" v-for="player in players" :key="player.name" style="display:inline-flex">
                <div>
                  <img width="50px" height="50px" :src="player.emoji" alt="emoji">
                </div>
                <div>
                  <span class="name">{{ player.name }}</span>
                  <span class="score">{{ player.score }}</span>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <template v-if="resultState === 'loss'">
          <div class="block">
            <h2 class="subtitle gamemode">Popular Pick</h2>
            <h1 class="title">Bad Choice</h1>
            <h4 class="subtitle is-4">You lose this round!</h4>
          </div>
          <div class="block">
            <figure class="media-content">
              <p class="image is-200x200">
                <a href="">
                  <b-skeleton circle width="200px" height="200px"></b-skeleton>
                </a>
              </p>
            </figure>
          </div>
          <div class="block" style="margin-bottom: 50px;">
            <h1 class="title has-text-weight-bold is-uppercase" style="color:#EB5757">Losser pick</h1>
            <h5 class="subtitle"><span class="has-text-weight-bold">0</span> points for you</h5>
          </div>
          <div class="block">
            <ul>
              <li class="players" v-for="player in players" :key="player.name" style="display:inline-flex">
                <div>
                  <img width="50px" height="50px" :src="player.emoji" alt="emoji">
                </div>
                <div>
                  <span class="name">{{ player.name }}</span>
                  <span class="score">{{ player.score }}</span>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <template v-if="resultState === 'mia'">
          <div class="block">
            <h2 class="subtitle gamemode">Popular Pick</h2>
            <h1 class="title">Didn't Answer</h1>
            <h4 class="subtitle is-4">You lose this round!</h4>
          </div>
          <div class="block">
            <figure class="media-content">
              <p class="image is-200x200">
                <a href="">
                  <b-skeleton circle width="200px" height="200px"></b-skeleton>
                </a>
              </p>
            </figure>
          </div>
          <div class="block" style="margin-bottom: 50px;">
            <h1 class="title has-text-weight-bold is-uppercase" style="color:#EB5757">Must take a sip</h1>
            <h5 class="subtitle"><span class="has-text-weight-bold">No points</span> & you will sitout the next rounds</h5>
          </div>
          <div class="block">
            <ul>
              <li class="players" v-for="player in players" :key="player.name" style="display:inline-flex">
                <div>
                  <img width="50px" height="50px" :src="player.emoji" alt="emoji">
                </div>
                <div>
                  <span class="name">{{ player.name }}</span>
                  <span class="score">{{ player.score }}</span>
                </div>
              </li>
            </ul>
          </div>
        </template>


      </div>
    </div>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: 'G',
  data() {
    return {
      name: 'Rose',
      radio: 'Jack',
      pId: '',
      actView: '',
      players: [
        { name: 'Bob', emoji: require('../../assets/1F973.svg'), score: 20 },
        { name: 'Mia', emoji: require('../../assets/1F929.svg'), score: 70 },
        { name: 'Anna', emoji: require('../../assets/1F61C.svg'), score: 30 },
        { name: 'Elli', emoji: require('../../assets/1F911.svg'), score: 10 },
        { name: 'Todd', emoji: require('../../assets/1F92F.svg'), score: 80 }
      ],
      // completedSteps: 9,
      totalSteps: 10,
      countDown: 10,
      optionsColumns: 4,
      optionsRows: 3,
      resultState: 'win'
    }
  },
  components: {
    RadialProgressBar
  },
  created: function () {
    let pageURL = window.location.href
    let loc = pageURL.indexOf('g?=')
    let pId
    if (loc === -1) {
      pId = null
    } else {
      pId = pageURL.substr(loc + 3, 7)
    }
    this.pId = pId
    if ((this.pId === 'owner') || (this.pId === 'control') || (this.pId === 'lobby') || (this.pId === 'round') || (this.pId === 'result')) {
      this.actView = this.pId
      if (this.actView === 'round') {
        this.countDownTimer()
      }
    } else {
      this.actView = 'invited'
    }
    console.log(this.resultState);
    setTimeout(() => {
      this.players[0].score += 10
      this.players[1].score += 10
      this.players[2].score += 10
    }, 1000)
  },
  methods: {
    copyLink () {
      let getGamelinkcontainer = document.getElementById('gamelink')
      getGamelinkcontainer.select()
      document.execCommand('Copy')
    },
    countDownTimer() {
      if(this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    },
    drunkCalc (val) {
      if (val >= 80) {
        return 'is-danger'
      } else if (val >= 40) {
        return 'is-warning'
      } else {
        return 'is-success'
      }
    }
  },
  computed: {
    gamelink: function () {
      return window.location.href
    },
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
  display: inline-flex;
  position: relative;
  margin: 0 10px 5px;
  width: fit-content;
  padding-top: 30px;
}
.control-page .players {
  display: flex;
  margin: 0 auto;
  padding-top: 10px;
}
.players .name { display: block; font-weight: 600;}
.players .score { display: block;}
#gamelink { text-align: center;}
.title.gamemode, .subtitle.gamemode {
  background-color: #3298dc;
  color: #fff;
  border-radius: 4px;
  width: fit-content;
  margin: 0 auto;
  padding: 20px;
}
.round-page h2.subtitle.gamemode {
  font-size: 19px;
  padding: 5px;
  margin: 0;
}
.result-page h2.subtitle.gamemode {
  font-size: 19px;
  padding: 5px;
}
.b-skeleton-item {
  margin: 0 auto;
}
.dev-select{
  background-color: #f5f5f5;
  padding: 30px 20px;
  position: fixed;
  right: 0;
  top: 0;
}
.progress-wrapper.drunkmeter {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  position: absolute;
  width: 30px;
  top: 10px;
  left: 10px;
  margin: 0 !important;
}
.drunkmeter>progress{
  height: 10px;
  width: 30px;
}



</style>
