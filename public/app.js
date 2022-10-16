const socket = io();

const button = document.querySelector('#submit');
const sudoku = document.querySelector('#sudoku');
const message = document.querySelector('#message');

const cells = Array.from(sudoku.children);

cells.forEach(cell => {
    cell.addEventListener('keyup', (event) => {
        if (validate(cell)) socket.emit('change', {
            cell: cell.id,
            newValue: cell.value
        });
    })
})


button.addEventListener('click', (event) => {
    socket.emit('submit');
})

// socket.onAny(console.log)

socket.on('change', (data) => {
    console.log(data.cell)
    document.querySelector('#' + data.cell).value = data.newValue;
})


socket.on('pass', (data) => {
    message.style.color = 'green';
    button.disabled = true;
    cells.forEach(cell => cell.disabled = true);
    setTimeout(location.reload.bind(location), 10000);
    let timeout = 10;
    setInterval(() => message.innerText = 'Congrats, Auto reload in : ' + timeout--, 1000)
})

socket.on('fail', () => {
    message.style.color = 'red';
    message.innerText = 'Submission Failed';
    setTimeout(() => {
        message.innerText = '';
    }, 5000)
})

const validate = (cell) => {
    if (cell.value.length > 1 || isNaN(cell.value)) {
        alert('Not a valid entry');
        cell.value = ''
        return false
    }
    return true
}

const populate = (data) => {
    const puzzle = data.question;
    const currentState = data.state;

    for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[i] !== '0') document.querySelector('#cell' + i).disabled = true;
    }

    for (let i = 0; i < currentState.length; i++) {
        if (currentState[i] !== '0') document.querySelector('#cell' + i).value = currentState[i];
    }
}

socket.on('sudoku', populate)

socket.emit('sudoku');