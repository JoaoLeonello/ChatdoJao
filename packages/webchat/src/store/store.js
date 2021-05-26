import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: "",
        messagesPool: [],
        userMessageInput: "",
        socketsConnected: [],
        isConnected: false,
    },
    mutations: {
        SOCKET_CHATMESSAGE(state, message) {
          state.messagesPool.push(message);
        }
      },
})
