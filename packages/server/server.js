const express = require('express');
const app = express();

const server = require("http").createServer(app);
const SocketIO = require("socket.io");
io = SocketIO(server, { cors: { origin: '*' }, pingInterval: 60000 });

let socketsConnected = []
io.on('connection', async (socket) => {
    socketsConnected.push(socket.id);
    socket.emit('socketsConnected', { socketsConnected });

    socket.on('client_emit_message', (messageObject) => {
        io.emit('messageChannel', messageObject);
        console.log(messageObject)
    });
});

io.on('disconnect', async (socket) => {
    console.log('DISCONNECTED')
    socketsConnected = socketsConnected.filter(sckt => sckt.id !== socket.id)
    socket.emit('socketsConnected', { socketsConnected });
})

server.listen(3052, () => { console.log('Server ONLINE') });
