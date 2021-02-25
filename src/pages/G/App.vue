<template>
  <div id="app">
    <HeaderCompo />
    
    <div class="join-page" v-if="viewActive === 'invited'">
      <div class="container">
        <div class="box join">
          <h2 class="sub">You’re about to join</h2>
          <h1 class="title">{{ game_name }}</h1>
          <div class="block">
            <p class="guides">Pick your avatar</p>
            <div class="wrap-pick-avatar">
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F973" value="1F973" v-model="avatarSelector">
                <img src="@/assets/1F973.svg" alt="emoji">
              </label>
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F929" value="1F929" v-model="avatarSelector">
                <img src="@/assets/1F929.svg" alt="emoji">
              </label>
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F61C" value="1F61C" v-model="avatarSelector">
                <img src="@/assets/1F61C.svg" alt="emoji">
              </label>
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F911" value="1F911" v-model="avatarSelector">
                <img src="@/assets/1F911.svg" alt="emoji">
              </label>
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F92F" value="1F92F" v-model="avatarSelector">
                <img src="@/assets/1F92F.svg" alt="emoji">
              </label>
            </div>
          </div>
          <div>

          </div>
          <b-field label="What's Your Name?">
              <b-input v-model="player_name" placeholder="Jong-Un..."></b-input>
          </b-field>
          <b-field label="Password please...">
              <b-input type="password"
                  value="iwantmytreasure"
                  password-reveal>
              </b-input>
          </b-field>
          <b-button class="bluish" type="is-success" v-on:click="joinGame">Join</b-button>
        </div>
      </div>
    </div>

    <div class="join-page" v-if="viewActive === 'owner'">
      <div class="container">
        <div class="box join">
          <h2 class="sub">You’re about to join</h2>
          <h1 class="title">{{ game_name }}</h1>
          <div class="block">
            <p class="guides">Pick your avatar</p>
            <div class="wrap-pick-avatar">
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F973" value="1F973" v-model="avatarSelector">
                <img src="@/assets/1F973.svg" alt="emoji">
              </label>
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F929" value="1F929" v-model="avatarSelector">
                <img src="@/assets/1F929.svg" alt="emoji">
              </label>
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F61C" value="1F61C" v-model="avatarSelector">
                <img src="@/assets/1F61C.svg" alt="emoji">
              </label>
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F911" value="1F911" v-model="avatarSelector">
                <img src="@/assets/1F911.svg" alt="emoji">
              </label>
              <label class="pick-avatar">
                <input type="radio" name="avatar" id="1F92F" value="1F92F" v-model="avatarSelector">
                <img src="@/assets/1F92F.svg" alt="emoji">
              </label>
            </div>
          </div>
          <b-field label="What's Your Name?" class="guides">
              <b-input v-model="player_name" placeholder="Jong-Un..."></b-input>
          </b-field>
          <div class="block">
            <b-button class="bluish" type="is-success" v-on:click="joinGame">Join</b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="control-page" v-if="viewActive === 'control'">
      <div class="container">
        <div class="box ">
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
                  <a href="" class="delete" @click="kickPlayer(player.clientId)"></a>
                </div>
              </li>
            </ul>
          </div>
          <div class="block">
            <b-button type="is-success" v-on:click="startRound()">Start Next Round</b-button>
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
    </div>

    <div class="lobby-page" v-if="viewActive === 'lobby'">
      <div class="container">
        <div class="box lobby">
          <div class="block waiting">
            <div class="wait-icon"><img src="@/assets/wait.svg" alt="wait"></div>
            <p>Waiting for *creator* to start the next round</p>
          </div>
          <div class="block">
            <h1 class="title">{{ game_name }}</h1>
            <h2 class="sub">Round {{ roundNumber }}</h2>
          </div>
          <div class="block">
            <div>
              <h3 class="sub">Next round mode:</h3>
              <div class="gamemode" :class="gameMode">
                <div class="modename">
                  <h3>{{gameMode}}</h3>
                </div>
                <div class="modedesc">
                  <h3 v-if="gameMode === 'popular'">Most Popular Pick Wins</h3>
                  <h3 v-if="gameMode === 'unpopular'">Less Popular Pick Wins</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="block" style="margin:0 -30px;">
            <ul>
              <li class="players" v-for="player in players" :key="player.name">
                <div class="p-avatar">
                  <b-progress class="drunkmeter" :type="drunkCalc(player.score)" :value="player.score"></b-progress>
                  <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
                </div>
                <div class="p-name">
                  <span class="name">{{ player.name }}</span>
                  <span class="score">{{ player.score }}pts</span>
                </div>
                <div class="punish">
                  <a href="">
                    <b-icon
                        pack="fas"
                        icon="wine-bottle"
                        size="is-small">
                    </b-icon>
                  </a>
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
    </div>

    <div class="round-page" v-if="viewActive === 'round'">
      <div class="container">
        <div class="box round">
          <div style="padding: 0 30px;position:relative;">
            <div class="block" style="text-align: left;">
              <h1 class="title round">Round {{ roundNumber }}</h1>
              <h2 class="gamemode mini" :class="gameMode">{{gameMode}} Mode</h2>
            </div>
            <div class="block thetimer" style="text-align: -webkit-right;">
              <radial-progress-bar
                :diameter="60"
                :strokeWidth="14"
                :completed-steps="countDown"
                :total-steps="totalSteps"
                :is-clockwise="false"
                :inner-stroke-color="'#FFFFFF'"
                :start-color="'#0899ff'"
                :stop-color="'#207cff'"
                :timingFunc="'linear'"
              >
              </radial-progress-bar>
              <div class="text-timer">
                <p class="count">{{ countDown }}</p>
                <p>secs</p>
              </div>
            </div>
          </div>
          <div :class="['items_container', { active: prePicked }]">
            <div v-for="(item, index) in goRound" :key="index" :class="['item item_' + (index), getPickClass(index)]">
              <figure class="media-content">
                <p class="image is-100x100">
                  <a href="javascript:void(0);" @click="pickMade(roundNumber, (index))">
                    <b-skeleton circle width="90px" height="90px"></b-skeleton>
                    <p class="item-number" v-html="getItemImg(item)"></p>
                  </a>
                </p>
              </figure>
            </div>
          </div>
          <b-loading v-model="isCounting" :is-full-page="true" :can-cancel="false"></b-loading>
        </div>
      </div>
    </div>

    <div class="result-page" v-if="viewActive === 'result'">
      <div class="container">

        <!-- <div class="block dev-select">
          <b-field label="Dev View Selector">
              <b-select placeholder="Select a state" v-model="resultState">
                  <option value="win">Win</option>
                  <option value="loss">Loss</option>
                  <option value="mia">Didn't Answer</option>
              </b-select>
          </b-field>
        </div> -->
        <div class="box result">
          <template v-if="resultState === 'won'">
            <div class="block results-titles">
              <h2 class="gamemode mini" :class="gameMode">{{gameMode}} Mode</h2>
              <h1 class="title">Good Choice</h1>
            </div>
            <div class="block results-items">
              <div class="items_container">
                <div class="item">
                  <figure class="media-content">
                    <div class="image is-100x100">
                      <b-skeleton circle width="90px" height="90px"></b-skeleton>
                      <div class="item-number" v-html="getItemImg(goRound[currentPick])"></div>
                    </div>
                  </figure>
                </div>
                <div class="item" v-if="winningPick !== null">
                  <figure class="media-content">
                    <div class="image is-100x100">
                      <b-skeleton circle width="90px" height="90px"></b-skeleton>
                      <div class="item-number" v-html="getItemImg(goRound[winningPick])"></div>
                    </div>
                  </figure>
                </div>
                <span class="result-icon correct">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                </span>
              </div>
            </div>
            <div class="block results-desc" style="margin-bottom: 20px;">
              <h3 class="desc">Your pick was <br> the most popular</h3>
              <h3 class="action" style="color:#00D73C">+10 <span>Points</span></h3>
            </div>
            <div class="block" style="margin: 0px -30px;">
              <ul>
                <li class="players" v-for="player in players" :key="player.name">
                  <div class="p-avatar">
                    <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
                  </div>
                  <div class="p-name">
                    <span class="name">{{ player.name }}</span>
                    <span class="score">{{ player.score }}pts</span>
                  </div>
                  <div class="resultish" v-html="getPlayerAction(roundNumber, player.clientId)">
                  </div>
                </li>
              </ul>
            </div>
          </template>

          <template v-if="resultState === 'loss'">
            <div class="block results-titles">
              <h2 class="gamemode mini" :class="gameMode">{{gameMode}} Mode</h2>
              <h1 class="title">Bad Choice</h1>
            </div>
            <div class="block results-items">
              <div class="items_container">
                <div class="item">
                  <figure class="media-content">
                    <div class="image is-100x100">
                      <b-skeleton circle width="90px" height="90px"></b-skeleton>
                      <div class="item-number" v-html="getItemImg(goRound[currentPick])"></div>
                    </div>
                  </figure>
                </div>
                <div class="item" v-if="winningPick !== null">
                  <figure class="media-content">
                    <div class="image is-100x100">
                      <b-skeleton circle width="90px" height="90px"></b-skeleton>
                      <div class="item-number" v-html="getItemImg(goRound[winningPick])"></div>
                    </div>
                  </figure>
                </div>
                <span class="result-icon incorrect" v-if="winningPick !== null">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                </span>
              </div>
            </div>
            <div class="block results-desc" style="margin-bottom: 20px;">
              <h3 class="desc">Your pick wasn't <br> the most popular</h3>
              <h3 class="action" style="color:#ff2753"><span>You Must</span> DRINK</h3>
            </div>
            <div class="block" style="margin: 0px -30px;">
              <ul>
                <li class="players" v-for="player in players" :key="player.name">
                  <div class="p-avatar">
                    <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
                  </div>
                  <div class="p-name">
                    <span class="name">{{ player.name }}</span>
                    <span class="score">{{ player.score }}pts</span>
                  </div>
                  <div class="resultish" v-html="getPlayerAction(roundNumber, player.clientId)">
                  </div>
                </li>
              </ul>
            </div>
          </template>

          <template v-if="(resultState === 'mia') || (resultState === 'afk')">
            <div class="block results-titles">
              <h2 class="gamemode mini" :class="gameMode">{{gameMode}} Mode</h2>
              <h1 class="title">You there?</h1>
            </div>
            <div class="block results-items">
              <div class="items_container">
                <div class="item">
                  <figure class="media-content">
                    <div class="image is-100x100">
                      <b-skeleton circle width="90px" height="90px"></b-skeleton>
                      <div class="item-number">?</div>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
            <div class="block results-desc" style="margin-bottom: 20px;">
              <h3 class="desc">Didn’t choose on time</h3>
              <h3 class="action" style="color:#ff2753"><span>You Must</span> DRINK</h3>
            </div>
            <div class="block" style="margin: 0px -30px;">
              <ul>
                <li class="players" v-for="player in players" :key="player.name">
                  <div class="p-avatar">
                    <img width="50px" height="50px" :src="getEmoji(player.emoji)" alt="emoji">
                  </div>
                  <div class="p-name">
                    <span class="name">{{ player.name }}</span>
                    <span class="score">{{ player.score }}pts</span>
                  </div>
                  <div class="resultish" v-html="getPlayerAction(roundNumber, player.clientId)">
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

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import RadialProgressBar from 'vue-radial-progress'
import HeaderCompo from '@/components/HeaderCompo.vue'

export default {
  name: 'G',
  data() {
    return {
      game_name: '',
      player_name: '',
      avatarSelector: '1F61C',
      gId: '',
      viewActive: '',
      players: [],
      // completedSteps: 9,
      totalSteps: 5,
      countDown: 5,
      optionsColumns: 4,
      optionsRows: 3,
      resultState: 'won',
      isAuthor: false,
      gameStatus: '',
      rounds: [
        {
          round: 1,
          items: [
            'drunkie.png',
            'abvv.gif',
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
      roundNumber: 1,
      clientId: '',
      winningPick: null,
      currentPick: null,
      activeRound: [],
      goRound: [],
      playersCount: '',
      backendVersion: null,
      backendFresh: null,
      gameMode: null
    }
  },
  components: {
    RadialProgressBar,
    HeaderCompo
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


    // checking for localStorage cliend ID
    let localClientId = 'pickio_cliend_id_'+gId
    if (localStorage.getItem(localClientId) === null) {
      let clientId = this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      localStorage.setItem(localClientId, clientId);
      this.clientId = clientId;
    } else {
      let clientId = localStorage.getItem(localClientId);
      this.$socket.client.emit('user_exist', {'clientId':clientId, 'gId':gId});
      this.clientId = clientId;
    }


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
    backend_version(version) {
      this.backendFresh = version
      if ((this.backendVersion !== version) && (this.backendVersion !== null)) {
        location.reload();
      }
    },
    update_players(data){
      this.roundNumber = data.round;
      this.gameStatus = data.status;
      this.players = data.players;
      let amIkicked = data.players.find(player => player.name === this.player_name);
      if (!amIkicked) {
        if (this.isAuthor) {
          this.viewActive = 'owner';
        } else {
          this.viewActive = 'invited';
        }
      }
    },
    existing_user(data){
      this.players = data.players;
      this.player_name = data.existing.name;
      this.avatarSelector = data.existing.emoji;
      this.roundNumber = data.game.round;
      this.gameStatus = data.game.status;
      this.winningPick = data.game.winning;
      this.isCounting = false;
      // console.log(data.game.status);
      if (data.game.status === 'result') {
        let thisplayer = data.players.find(player => player.name === this.player_name);
        if (thisplayer) {
          let roundResult = thisplayer.picks.find(game => game.round === this.roundNumber);
          // console.log(roundResult.result);
          this.resultState = String(roundResult.result);
          this.currentPick = roundResult.pick;
        }
      }
      if (data.existing.type === 'author') {
        this.isAuthor = true;
        if (data.game.status === 'lobby') {
          this.viewActive = 'control';
        } else {
          this.viewActive = data.game.status;
        }
      } else {
        this.viewActive = data.game.status;
      }
    },
    not_user() {
      console.log('user not saved');
    },
    game_id(data) {
      console.log(data);
    },
    game_name(data) {
      this.game_name = data.gamename;
      this.rounds = data.rounds;
      let roundFound = this.rounds.find(e => e.round === this.roundNumber);
      this.activeRound = roundFound;
      this.backendVersion = data.backend_version;
      this.gameMode = data.gamemode;
      console.log(this.gameMode);
    },
    game_status(data) {
      this.gameStatus = data.status;
      this.roundNumber = data.round;
      this.rounds = data.rounds;
      this.gameMode = data.gamemode;
      console.log(this.gameMode);
      // if (this.gameStatus === 'lobby') {
        this.countDown = 5;
        if (this.viewActive === 'result') {
          // console.log(this.roundNumber);
          if (this.isAuthor) {
            this.viewActive = 'control'
          } else {
            this.viewActive = 'lobby'
          }
        }
    },
    round_starts (data) {
      // this.$socket.client.emit('play_time', {'gId': this.gId});
      this.gameStatus = data.status;
      this.roundNumber = data.round;
      this.playersCount = data.players_count;
      let itemsMod = this.itemsCalc(this.playersCount, this.gameMode);
      this.goRound = this.activeRound.items.slice(0,itemsMod);
      // console.log(JSON.stringify(this.goRound)+' hooo');
      if (this.viewActive === 'lobby' || this.viewActive === 'control') {
        this.viewActive = data.status;
        this.countDownTimer();
        setTimeout(() => {
          if (this.prePicked === true) {
            this.sendPick(this.roundNumber, this.prePick);
          } else {
            this.sendPick(this.roundNumber, -1);
          }
        }, 6300)
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
        let thisplayer = data.players.find(player => player.name === this.player_name);
        if (thisplayer) {
          let roundResult = thisplayer.picks.find(game => game.round === this.roundNumber);
          // console.log(roundResult.result);
          this.resultState = String(roundResult.result);
          this.currentPick = roundResult.pick;
        }
        // this.resultState = data.result;
        this.players = data.players;
        this.winningPick = data.winning;
      }
    }
  },
  methods: {
    joinGame () {
      if (this.player_name === '') {
        console.log('empty name or duplicated');
        // console.log(this.backendVersion + ' saved');
        // console.log(this.backendFresh +' fresh');
      } else {
        if (this.isAuthor) {
          let new_player = {
            name: this.player_name,
            emoji: this.avatarSelector,
            type: 'author',
            score: 0,
            picks: [],
            clientId : this.clientId
          }
          this.$socket.client.emit('new_player', {'newPlayer':new_player, 'gId': this.gId});
          this.viewActive = 'control';
        } else {
          let new_player = {
            name: this.player_name, 
            emoji: this.avatarSelector, 
            type: 'invited', 
            score: 0,
            picks: [],
            clientId : this.clientId
          };
          this.$socket.client.emit('new_player', {'newPlayer':new_player, 'gId': this.gId});
          this.viewActive = 'lobby';
        }
      }
    },
    startRound () {
      this.$socket.client.emit('start_round', {'round':this.roundNumber, 'gId': this.gId});
    },
    nextRound () {
      this.$socket.client.emit('next_round', {'round':this.roundNumber, 'gId':this.gId});
    },
    pickMade (round, pick) {
      this.prePicked = true;
      this.prePick = pick;
    },
    sendPick (sendRound, sendPick) {
      this.$socket.client.emit('pick_made', {'name':this.player_name, 'round':sendRound, 'pick':sendPick, 'gId': this.gId});
      // this.$socket.client.emit('pick_time');
    },
    getPickClass (index) {
      if ((this.prePicked) && (index === this.prePick)) {
        return 'prepicked'
      }
    },
    copyLink () {
      let getGamelinkcontainer = document.getElementById('gamelink')
      getGamelinkcontainer.select()
      document.execCommand('Copy')
    },
    countDownTimer() {
      this.countDown = 5;
      let downloadTimer = setInterval(() => {
        if(this.countDown <= 1){
          clearInterval(downloadTimer);
        }
        this.countDown -= 1;
        // console.log(this.countDown);
      }, 1000);
    },
    randomString (idlenght, abc123) {
      let stringGenerated = ''
      for (var i = idlenght; i > 0; --i) {
        stringGenerated += abc123[Math.round(Math.random() * (abc123.length - 1))]
      }
      return stringGenerated
    },
    kickPlayer(playerId) {
      this.$socket.client.emit('kick_player', {'playerId':playerId, 'gId':this.gId});
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
    getPlayerAction (round, clientId) {
      let thisplayer = this.players.find(player => player.clientId === clientId);
      if (thisplayer) {
        let playerResult = thisplayer.picks.find(game => game.round === round);
        // console.log(JSON.stringify(playerResult) +' hi there');
        if (playerResult) {
          let toReturn;
          switch (playerResult.result) {
            case 'won':
              toReturn = `<span class='won'>+10PTS</span>`;
              break;
            case 'loss':
              toReturn = `<span class='loss'>DRINK</span>`;
              break;
            case 'afk':
              toReturn = `<span class='loss'>DRINK</span>`;
              break;
            case 'mia':
              toReturn = `<span class='loss'>DRINK</span>`;
              break;
            default:
              toReturn = '';
          }          
          return toReturn;
        }
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
    },
    itemsCalc (players,mode) {
      if (mode === 'popular') {
        if (players >= 1) {
          return players;
        } else if (players >= 3) {
          return players - 1;
        } else if (players >= 7) {
          return 4
        }
      } else if (mode === 'unpopular') {
        if (players >= 1) {
          return players;
        } else if (players >= 3) {
          return players - 1;
        } else if (players >= 7) {
          return 4
        }
      }
    },
    getItemImg(val) {
      if (val.endsWith(".png")) {
        if (val === 'drunkie.png'){
          let requiring = require('../../assets/pick-items/drunkie.png');
          return `<img src="`+requiring+`">`
        }
      } else if (val.endsWith(".gif")) {
          let requiring = require('../../assets/pick-items/'+ val);
          return `<img src="`+requiring+`">`
      } else {
        return val
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
  },
  watch: {
    // whenever question changes, this function will run
    roundNumber: function () {
      let roundFound = this.rounds.find(e => e.round === this.roundNumber);
      this.activeRound = roundFound
      // console.log(JSON.stringify(this.activeRound)+' hey');
      // console.log(this.roundFound + 'hi');
    }
  }
}
</script>

<style>
</style>
