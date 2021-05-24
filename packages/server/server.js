const express = require('express');
const app = express();

const server = require("http").createServer(app);
const SocketIO = require("socket.io");
io = SocketIO(server, { cors: { origin: '*' }, pingInterval: 60000 });


io.engine.on('connection', async (socket) => {
    console.log('connection', socket.id)

    socket.on('client_emit_message', (messageObject) => {
        console.log('here')
        console.log(messageObject)
    });
});

server.listen(3052, () => { console.log('Server ONLINE') });
