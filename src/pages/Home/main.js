import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSocketio from "vue-socket.io-extended";
import io from "socket.io-client";

// Importing the global css file
import '@/assets/global.css'

Vue.use(VueSocketio, io("https://pickio-backend.herokuapp.com"));

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
