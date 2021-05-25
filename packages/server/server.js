const express = require('express');
const app = express();

const server = require("http").createServer(app);
const SocketIO = require("socket.io");
io = SocketIO(server, { cors: { origin: '*' }, pingInterval: 60000 });

let socketsConnected = []
io.on('connect', async (socket) => {
    let socketUsername = socket.handshake.query.username;
    socketsConnected.push(socketUsername);

    io.emit('socketsConnected', { socketsConnected });

    console.log('CONECTADO', socket.id, socketUsername, socketsConnected);

    socket.on('client_emit_message', ({ message }) => {
        io.emit('messageChannel', { message, sender: socketUsername});
        console.log('MESSAGE_RECEIVED', { message, sender: socketUsername})
    });

    socket.on('client_emit_change_username', ({ username }) => {
        socketsConnected = socketsConnected.filter(username => username !== socketUsername)
        socketsConnected.push(username);
        socketUsername = username
    })
});

io.on('disconnect', async (socket) => {
    socketsConnected = socketsConnected.filter(sckt => sckt.id !== socket.id)
    socket.emit('socketsConnected', { socketsConnected });
})

server.listen(3052, () => { console.log('Server ONLINE') });
