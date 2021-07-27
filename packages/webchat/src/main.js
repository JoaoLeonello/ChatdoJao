import Vue from 'vue'
import App from './App.vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import './index.css'

Vue.config.productionTip = false

const socket = io('http://localhost:3052/');
Vue.use(VueSocketIOExt, socket);

new Vue({
  render: h => h(App),
}).$mount('#app')