const { boards, inputs } = require('./data/bingo.data')

const run = () => {
    //iterate input
    const winners = []
    const winningValues = [];
    const trackers = Array.from(boards, (matrix) => Array.from(matrix, (row) => Array.from(row)));

    for (let i = 0; i < inputs.length; ++i) {
        const input = inputs[i];

        for (let j = 0; j < boards.length; ++j) {
            const board = boards[j]
            const tracker = trackers[j]
            if (winners.includes(tracker)) continue;

            const [row, column] = setValue(input, board, tracker);
            if (row === -1) continue;

            const isRowWin = evaluateRow(tracker, row);
            const isColWin = evaluateColumn(tracker, column);
            if (!isRowWin && !isColWin) continue;

            winners.push(tracker);
            winningValues.push(input);
        }
    }

    if (winners.length) {
        let winningBoard = winners.pop();
        let winningValue = winningValues.pop();
        const sum = sumBoard(winningBoard);
        const points = sum * winningValue;
        console.log(winningBoard);
        console.log(points)
    } else {
        console.log('You lose');
        console.log(trackers)
    }
}

const setValue = (input, board, tracker) => {
    for (let rowIndex = 0; rowIndex < board.length; ++rowIndex) {
        const row = board[rowIndex];
        const rowLength = row.length;

        for (let i = 0; i < rowLength; ++i) {
            if (row[i] !== input) continue;

            tracker[rowIndex][i] = 'x'
            return [rowIndex, i]
        }
    }
    return [-1, -1]
}

const evaluateRow = (tracker, row) => {
    for (let value of tracker[row]) {
        if (value !== 'x') {
            return false;
        }
    }

    return true;
}

const evaluateColumn = (tracker, column) => {
    for (let i = 0; i < tracker.length; ++i) {
        if (tracker[i][column] !== 'x') {
            return false
        }
    }

    return true;
}

const sumBoard = (board) => {
    let sum = 0;
    for (let i = 0; i < board.length; ++i) {
        const row = board[i];
        const rowLength = row.length;

        for (let j = 0; j < rowLength; ++j) {
            const value = row[j];
            if (value != 'x') sum += value;
        }
    }
    return sum;
}

module.exports = run();