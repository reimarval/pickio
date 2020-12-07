import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSocketio from "vue-socket.io-extended";
import io from "socket.io-client";

Vue.use(VueSocketio, io("http://192.168.1.6:3000"));

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
