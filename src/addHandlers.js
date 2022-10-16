class Handler {
    constructor(io, sudoku, socket) {
        this.io = io;
        this.sudoku = sudoku;
        this.socket = socket;
    }

    handle = (event, handler) => {
        this.socket.on(event, handler.bind(null, this.io, this.sudoku, this.socket))
    }
}


const updateHandler = (io, sudoku, socket, data) => {
    const index = parseInt(data.cell.replace('cell', ''));

    console.log(sudoku.state)

    const sudokuArray = sudoku.state.split('');
    sudokuArray[index] = data.newValue === '' ? '0' : data.newValue;
    sudoku.state = sudokuArray.join('');

    console.log(sudoku.state)

    io.emit('change', data)
}

const submitHandler = (io, sudoku, socket, data) => {
    if(sudoku.state === sudoku.answer) {
        sudoku.state = sudoku.question;
        io.emit('pass', {
            question: sudoku.question,
            state: sudoku.state
        });
    }
    else io.emit('fail');
}

const sendSudoku = (io, sudoku, socket) => {
    socket.emit('sudoku', {
        question: sudoku.question,
        state: sudoku.state
    })
}

module.exports = (io, sudoku, socket) => {
    const { handle }  = new Handler(io, sudoku, socket);

    handle('change', updateHandler);
    handle('submit', submitHandler);
    handle('sudoku', sendSudoku);
    
}
