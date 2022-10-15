const socket = io();

const button = document.querySelector('#submit');

button.addEventListener('click', (event) => {
    socket.emit('submit');
})

socket.onAny(console.log)