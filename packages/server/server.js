const express = require('express');
const app = express();

const server = require("https").createServer(app);
const SocketIO = require("socket.io");
io = SocketIO(server, { cors: { origin: '*' }, pingInterval: 60000 });

let socketsConnected = []
io.on('connection', async (socket) => {
    console.log('CONECTADO', socket.id);

    let socketUsername = socket.handshake.query.username;
    socketsConnected.push(socketUsername);

    io.emit('socketsConnected', { socketsConnected });

    socket.on('client_emit_message', ({ message }) => {
        io.emit('chatMessage', { message, sender: socketUsername });
    });

    socket.on('client_emit_change_username', ({ username }) => {
        socketsConnected = socketsConnected.filter(username => username !== socketUsername)
        socketsConnected.push(username);
        socketUsername = username
    })
});

io.on('close', async (socket) => {
    socketsConnected = socketsConnected.filter(sckt => sckt.id !== socket.id)
    io.emit('socketsConnected', { socketsConnected });
})

server.listen(80, () => { console.log('Server ONLINE') });
