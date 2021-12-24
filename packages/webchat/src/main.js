import { io } from 'socket.io-client';
import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import App from './App.vue';
import './index.css';

Vue.config.productionTip = false

const socket = io(process.env.VUE_APP_HOST);
Vue.use(VueSocketIOExt, socket);

new Vue({
  render: h => h(App),
}).$mount('#app')