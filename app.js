const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const { log } = require('console');
const server = http.createServer(app);
const io = socket(server);

app.use(express.static('public'));

app.use(express.static('views'));
app.get('/', (req, res) => {
    res.render('index');
})

io.on('connection', socket => {
    console.log('New user connected');
    console.table("User ", socket.handshake.query.t, 'just joined.');


    socket.on('typing', data => {
        log("User is typing...");
        socket.broadcast.emit('typing', data);
    });
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});