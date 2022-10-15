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

const sudokuData = {
    question: '000260701680070090190004500820100040004602900050003028009300074040050036703018000',
    answer: '435269781682571493197834562826195347374682915951743628519326874248957136763418259',
}

sudokuData.state = sudokuData.question;

io.on('connection', addHandlers.bind(null, io, sudokuData))

server.listen(3000);