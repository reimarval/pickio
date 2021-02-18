import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSocketIoExt from "vue-socket.io-extended";
import io from "socket.io-client";

// Importing the global css file
import '@/assets/global.css'

Vue.use(VueSocketIoExt, io("https://pickio-backend.herokuapp.com"));
// Vue.use(VueSocketIoExt, io("http://192.168.1.4:3000"));
// Vue.use(VueSocketIoExt, io("http://localhost:3000"));

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
