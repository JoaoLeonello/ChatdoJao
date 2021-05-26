import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import './index.css'

Vue.config.productionTip = false

// Vue.use(Vuex)

new Vue({
  sockets: {
    connect() {
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    messageChannel(messageObject) {
      this.messagesPool.push(messageObject);
    },

    socketsConnected({ socketsConnected }) {
      this.socketsConnected = socketsConnected;
    },
  },

  methods: {
    sendMessage() {
      if (this.userMessageInput === '') {
        return;
      }

      this.$socket.client.emit("client_emit_message", { message: this.userMessageInput });
      this.userMessageInput = '';
    },
  },

  render: h => h(App),
}).$mount('#app')
