const { SocketAddress } = require("net");

class Handler {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    handle(event, handler) {
        this.socket.on(event, handler).bind(null, this.io, this.socket)
    }
}

const updateHandler = (io, socket, data) => {
    socket.emit('msg', 'Hello World')
}

const submitHandler = (io, socket, data) => {
    socket.emit('msg', 'Hello Submit')
}

module.exports = (io, socket) => {
    const { handle }  = new Handler(io, socket);

    handle('change', updateHandler);
    handle('submit', submitHandler);
    
}
