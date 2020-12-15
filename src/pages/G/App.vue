<template>
  <div id="app">
    
    <div class="join-page" v-if="viewActive === 'invited'">
      <div class="container">
        <h1 class="title">You’re about to join SOMEONE Game</h1>
        <div class="block">
          <b-radio v-model="avatarSelector"
              name="avatar"
              native-value="1F973">
            <img src="@/assets/1F973.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="avatarSelector"
              name="avatar"
              native-value="1F929">
            <img src="@/assets/1F929.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="avatarSelector"
              name="avatar"
              native-value="1F61C">
            <img src="@/assets/1F61C.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="avatarSelector"
              name="avatar"
              native-value="1F911">
            <img src="@/assets/1F911.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="avatarSelector"
              name="avatar"
              native-value="1F92F">
            <img src="@/assets/1F92F.svg" alt="emoji">
          </b-radio>
        </div>
        <b-field label="What's Your Name?">
            <b-input v-model="player_name"></b-input>
        </b-field>
        <b-field label="Password please...">
            <b-input type="password"
                value="iwantmytreasure"
                password-reveal>
            </b-input>
        </b-field>
        <b-button type="is-success" v-on:click="joinGame">Join Game</b-button>
      </div>
    </div>

    <div class="join-page" v-if="viewActive === 'owner'">
      <div class="container">
        <h1 class="title">You’re about to join YOUR Game</h1>
        <div class="block">
          <b-radio v-model="avatarSelector"
              name="name"
              native-value="1F973">
            <img src="@/assets/1F973.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="avatarSelector"
              name="name"
              native-value="1F929">
            <img src="@/assets/1F929.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="avatarSelector"
              name="name"
              native-value="1F61C">
            <img src="@/assets/1F61C.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="avatarSelector"
              name="name"
              native-value="1F911">
            <img src="@/assets/1F911.svg" alt="emoji">
          </b-radio>
          <b-radio v-model="avatarSelector"
              name="name"
              native-value="1F92F">
            <img src="@/assets/1F92F.svg" alt="emoji">
          </b-radio>
        </div>
        <b-field label="What's Your Name?">
            <b-input v-model="player_name"></b-input>
        </b-field>
        <div class="block">
          <b-button type="is-success" v-on:click="joinGame">Join Game</b-button>
        </div>
      </div>
    </div>

    <div class="control-page" v-if="viewActive === 'control'">
      <div class="container">
        <div class="block">
          <h1 class="title">This is your game</h1>
        </div>
        <div class="block">
          <ul>
            <li class="players" v-for="player in players" :key="player.name">
              <div>
                <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
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
          <b-button type="is-success" v-on:click="startRound(roundNumber)">Start Next Round</b-button>
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

    <div class="lobby-page" v-if="viewActive === 'lobby'">
      <div class="container">
        <div class="block">
          <h2 class="subtitle" style="color:#f14668">Waiting for *creator* to start the next round</h2>
        </div>
        <div class="block">
          <h1 class="title">Round {{ roundNumber }}</h1>
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
                <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
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

    <div class="round-page" v-if="viewActive === 'round'">
      <div class="container">
        <div class="columns">
          <div class="column" style="text-align: left;">
            <h1 class="title">Round {{ roundNumber }}</h1>
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
        <div class="columns" v-for="i in Math.ceil(rounds[0].items.length / 3)" :key="i">
          <div v-for="(item, index) in rounds[0].items.slice((i - 1) * 3, i * 3)" :key="index" class="column">
            <figure class="media-content">
              <p class="image is-100x100">
                <a href="javascript:void(0);" @click="pickMade(roundNumber, item)">
                  <b-skeleton circle width="100px" height="100px"></b-skeleton>
                  <p class="item-number">{{item}}</p>
                </a>
              </p>
            </figure>
          </div>
        </div>
        <b-loading v-model="isCounting" :is-full-page="true" :can-cancel="false"></b-loading>
      </div>
    </div>

    <div class="result-page" v-if="viewActive === 'result'">
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
                <b-skeleton circle width="200px" height="200px"></b-skeleton>
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
                  <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
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
                <b-skeleton circle width="200px" height="200px"></b-skeleton>
              </p>
            </figure>
          </div>
          <div class="block" style="margin-bottom: 50px;">
            <h1 class="title has-text-weight-bold is-uppercase" style="color:#EB5757">Loser pick</h1>
            <h5 class="subtitle"><span class="has-text-weight-bold">0</span> points for you</h5>
          </div>
          <div class="block">
            <ul>
              <li class="players" v-for="player in players" :key="player.name" style="display:inline-flex">
                <div>
                  <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
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
                  <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
                </div>
                <div>
                  <span class="name">{{ player.name }}</span>
                  <span class="score">{{ player.score }}</span>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <div v-if="isAuthor" class="block">
          <b-button type="is-success" v-on:click="nextRound">Continue</b-button>
        </div>



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
      player_name: 'Ava',
      avatarSelector: '1F973',
      gId: '',
      viewActive: '',
      players: [],
      // completedSteps: 9,
      totalSteps: 10,
      countDown: 10,
      optionsColumns: 4,
      optionsRows: 3,
      resultState: 'win',
      isAuthor: false,
      gameStatus: '',
      rounds: [
        {
          round: 1,
          items: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12'
          ]
        }
      ],
      prePicked: false,
      prePick: '',
      isCounting: false,
      roundNumber: 1
    }
  },
  components: {
    RadialProgressBar
  },
  created: function () {
    let pageURL = window.location.href
    let loc = pageURL.indexOf('g?=')
    let gId
    if (loc === -1) {
      gId = null
    } else {
      gId = pageURL.substr(loc + 3, 5)
    }
    this.gId = gId
    if ((this.gId === 'owner') || (this.gId === 'control') || (this.gId === 'lobby') || (this.gId === 'round') || (this.gId === 'result')) {
      this.viewActive = this.gId
      if (this.viewActive === 'round') {
        this.countDownTimer()
      }
    } else {
      this.viewActive = 'invited'
    }
    this.$socket.client.emit('game_id', gId);

    let userTypeLoc = pageURL.indexOf('t?=');
    let userType
    if (userTypeLoc === -1) {
      userType = null
    } else {
      userType = pageURL.substr(userTypeLoc + 3, 6)
    }
    if (userType === 'author') {
      this.isAuthor = true
      this.viewActive = 'owner'
    }
  },
  sockets: {
    connect() {
      console.log("connected");
    },
    update_players(data){
      this.players = data;
    },
    game_id(data) {
      console.log(data);
    },
    game_status(data) {
      this.gameStatus = data.status;
      this.roundNumber = data.round;
      if (this.gameStatus === 'lobby') {
        this.countDown = 10;
        if (this.viewActive === 'result') {
          console.log(this.roundNumber);
          if (this.isAuthor) {
            this.viewActive = 'control'
          } else {
            this.viewActive = 'lobby'
          }
        }
      } else if (this.gameStatus === 'round') {
        if (this.viewActive === 'lobby' || this.viewActive === 'control') {
          this.viewActive = data.status;
          this.countDownTimer();
          setTimeout(() => {
            if (this.prePicked === true) {
              this.sendPick(this.roundNumber, this.prePick);
            } else {
              this.sendPick(this.roundNumber, 'NA');
            }
          }, 11000)
        }
      }
    },
    counting_picks () {
      this.isCounting = true;
    },
    round_results (data) {
      if (this.viewActive === 'lobby' || this.viewActive === 'control' || this.viewActive === 'round') {
        this.isCounting = false;
        this.prePicked = false;
        this.viewActive = 'result';
        this.resultState = data;
      }
    }
  },
  methods: {
    joinGame () {
      if (this.player_name === '') {
        console.log('empty name or duplicated');
      } else {
        if (this.isAuthor) {
          let new_player = {
            name: this.player_name,
            emoji: this.avatarSelector,
            type: 'author',
            score: 0,
            picks: []
          }
          this.$socket.client.emit('new_player', new_player);
          this.viewActive = 'control';
        } else {
          let new_player = { 
            name: this.player_name, 
            emoji: this.avatarSelector, 
            type: 'invited', 
            score: 0,
            picks: []
          };
          this.$socket.client.emit('new_player', new_player);
          this.viewActive = 'lobby';
        }
        // setTimeout(() => {
        //   this.players[0].score += 10
        //   this.players[1].score += 10
        //   this.players[2].score += 10
        // }, 1000)
      }
    },
    startRound (round) {
      this.$socket.client.emit('start_round', round);
    },
    nextRound () {
      this.$socket.client.emit('next_round', this.roundNumber);
    },
    pickMade (round, pick) {
      this.prePicked = true;
      this.prePick = pick;
      console.log('pickMade triggered');
    },
    // getPickClass (index) {
    //   // console.log(index == this.prePick);
    //   console.log(index);
    //   // console.log(this.prePick);
    //   if ((this.prePicked) && (index != this.prePick)) {
    //     return 'prepicked'
    //   }
    // },
    sendPick (sendRound, sendPick) {
      this.$socket.client.emit('pick_made', {'name':this.player_name, 'round':sendRound, 'pick':sendPick});
      // console.log(sendRound, sendPick);
    },
    copyLink () {
      let getGamelinkcontainer = document.getElementById('gamelink')
      getGamelinkcontainer.select()
      document.execCommand('Copy')
    },
    countDownTimer() {
      this.countDown = 10;
      let downloadTimer = setInterval(() => {
        if(this.countDown <= 1){
          clearInterval(downloadTimer);
        }
        this.countDown -= 1;
        // console.log(this.countDown);
      }, 1000);
      
      // if(this.countDown > 0) {
      //   setTimeout(() => {
      //     this.countDown -= 1
      //     this.countDownTimer()
      //   }, 1000)
      // }
    },
    drunkCalc (val) {
      if (val >= 80) {
        return 'is-danger'
      } else if (val >= 40) {
        return 'is-warning'
      } else {
        return 'is-success'
      }
    },
    getEmoji(val) {
      // require('../../assets/1F973.svg'),
      if (val === '1F92F'){
        return require('../../assets/1F92F.svg')
      } else if (val === '1F911') {
        return require('../../assets/1F911.svg')
      } else if (val === '1F61C') {
        return require('../../assets/1F61C.svg')
      } else if (val === '1F929') {
        return require('../../assets/1F929.svg')
      } else {
        return require('../../assets/1F973.svg')
      }
    }
  },
  computed: {
    gamelink: function () {
      return window.location.href
    },
    // getPickClass: function () {
    //   return {
    //     prepicked: this.prePicked,
    //     pick: this.prepick === 
    //   }
    // }
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
h1.title {margin-top: 0;}
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
.result-page .players {
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
.item-number {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: bold;
}
.prepicked {
  opacity: .5;
}
</style>
