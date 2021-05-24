const express = require('express');
const app = express();

const server = require("http").createServer(app);
const SocketIO = require("socket.io");
io = SocketIO(server, { cors: { origin: '*' }, pingInterval: 60000 });

let socketsConnected = []
io.on('connection', async (socket) => {
    console.log('teste', socket.id, JSON.stringify(socket.handshake.query));


    let socketUsername = socket.handshake.query.username;
    socketsConnected.push(socketUsername);
    
    

    socket.on('client_emit_message', ({ message }) => {
        io.emit('messageChannel', { message, sender: socketUsername});
    });

    socket.on('client_emit_change_username', ({ username }) => {
        socketUsername = username;
        socketsConnected = socketsConnected.filter(socketUsername => socketUsername !== username)
        socketsConnected.push(username);
    })
});

io.on('disconnect', async (socket) => {
    console.log('DISCONNECTED')
    socketsConnected = socketsConnected.filter(sckt => sckt.id !== socket.id)
    socket.emit('socketsConnected', { socketsConnected });
})

server.listen(3052, () => { console.log('Server ONLINE') });
