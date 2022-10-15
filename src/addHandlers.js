class Handler {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    handle = (event, handler) => {
        this.socket.on(event, handler.bind(null, this.io, this.socket))
    }
}

const question = '000260701680070090190004500820100040004602900050003028009300074040050036703018000';
const answer = '435269781682571493197834562826195347374682915951743628519326874248957136763418259';
const state = '435269781682571493197834562826195347374682915951743628519326874248957136763418259';

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
