const express = require('express');
const { Server: Socket } = require('socket.io');
const http = require('http');
const { addHandlers } = require('./src')

const app = express();
const server = http.createServer(app);
const io = new Socket(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/public/app.js')
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/public/style.css')
})

io.on('connection', (socket) => {
    addHandlers(io, socket);
})

app.listen(3000);