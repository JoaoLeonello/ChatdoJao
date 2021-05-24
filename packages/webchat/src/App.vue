<template>
  <div id="app">
    <div class="flex h-screen antialiased text-gray-800">
      <div class="flex flex-row h-full w-full overflow-x-hidden">
        <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div class="flex flex-row items-center justify-center h-12 w-full">
            <div
              class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div class="ml-2 font-bold text-3xl">Chat do Jao</div>
          </div>
          <div
            class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
          >
            <!-- <div class="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src="https://www.facebook.com/photo?fbid=4257212934307787&set=a.160204470675341"
                alt="Avatar"
                class="h-full w-full"
              />
            </div> -->
            <input
              placeholder="Your name:"
              type="text"
              class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              v-model="username"
            />
          </div>
          <div class="flex flex-col mt-8">
            <div
              class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
            >
              <div class="text-sm font-semibold mt-2">Online users:</div>
              <div v-for="(users, index) in socketsConnected" :key="index">{{ users }}</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-auto h-full p-6">
          <div
            class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
          >
            <div class="flex flex-col h-full overflow-x-auto mb-4">
              <div class="flex flex-col h-full">
                <div v-for="(message, index) in messagesPool" :key="index" class="grid grid-cols-12 gap-y-2">
                  <div v-if="message.sender !== username" class="col-start-1 col-end-8 p-3 rounded-lg">
                    <div class="flex flex-row items-center">
                      <div>
                        {{ message.sender }}
                      </div>
                      <div
                        class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                      >
                        <div>
                          {{ message.message }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="message.sender === username" class="col-start-6 col-end-13 p-3 rounded-lg">
                    <div
                      class="flex items-center justify-start flex-row-reverse"
                    >
                      <div>
                        {{ message.sender }}
                      </div>
                      <div
                        class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                      >
                        <div>
                          {{ message.message }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
              <!-- <div>
                <button
                  class="flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div> -->
              <div class="flex-grow ml-4">
                <div class="relative w-full">
                  <input
                    type="text"
                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    v-model="userMessageInput"
                    @keydown.enter="sendMessage"
                  />
                  <button
                    class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                  >
                    <!-- <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg> -->
                  </button>
                </div>
              </div>
              <div class="ml-4">
                <button class="pressDownButton" @click="sendMessage">
                  <span>Send</span>
                  <!-- <span class="ml-2">
                    <svg
                      class="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span> -->
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      username: "",
      messagesPool: [],
      userMessageInput: "",
      isConnected: false,
      socketsConnected: [],
    };
  },
  sockets: {
    connect() {
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    messageChannel({ messageObject }) {
      this.messagesPool.push(messageObject);
    },

    socketsConnected({ socketsConnected }) {
      this.socketsConnected = socketsConnected;
    }
  },
  methods: {
    sendMessage() {
      const messageObject = {
        sender: this.username,
        message: this.userMessageInput,
      };

      this.$socket.client.emit("client_emit_message", { messageObject });

      this.userMessageInput = '';
    },
  },
};
</script>

<style scoped>
.pressDownButton {
  background-color: hsl(222, 100%, 95%);
  padding: 12px 24px;
  color: hsl(243, 80%, 62%);
  border-radius: 6px;
  border-bottom: 4px solid hsl(221, 89%, 85%);
  border-top: 0px solid rgba(249, 250, 251);
  transition: all 0.1s ease-in-out;
}

.pressDownButton:active {
  border-bottom-width: 0;
  border-top-width: 4px;
}
</style>
