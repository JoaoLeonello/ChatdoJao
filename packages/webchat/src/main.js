import Vue from 'vue'
import App from './App.vue'
import './index.css'
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';


const socket = io('http://localhost:3052');

Vue.config.productionTip = false

Vue.use(VueSocketIOExt, socket);

new Vue({
  render: h => h(App),
}).$mount('#app')
