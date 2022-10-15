class Handler {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    handle = (event, handler) => {
        this.socket.on(event, handler.bind(null, this.io, this.socket))
    }
}

const question = '';
const answer = '';
const state = '';

const updateHandler = (io, socket, data) => {
    console.log(data)
    io.emit('change', data)
}

const submitHandler = (io, socket, data) => {
    socket.emit('msg', 'Hello Submit')
}

const sendSudoku = (io, socket) => {
    socket.emit('sudoku' )
}

module.exports = (io, socket) => {
    const { handle }  = new Handler(io, socket);

    handle('change', updateHandler);
    handle('submit', submitHandler);
    handle('sudoku', sendSudoku);
    
}
