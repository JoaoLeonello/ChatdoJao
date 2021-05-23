const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(cors())

app.post('/', (req, res) => {
    console.log(req.body.name)
    res.end();
})

io.on('connection', socket => {
    console.log('SOCKET CONNECT')
})

server.listen(3000);
