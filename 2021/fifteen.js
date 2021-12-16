const { input } = require('./data/fifteen.data')
const { sortedIndexBy, sortedIndex } = require('lodash')

const isCoord = (coord) => -1 < coord && coord < input.length;
const safety = Array.from(input, (cols) => Array.from(cols, () => Number.POSITIVE_INFINITY));

const addToQueue = (queue, tuple) => {
    const index = sortedIndexBy(queue, tuple, (t) => t[2]);
    queue.splice(index, 0, tuple);
}

const run = () => {
    const queue = [[0, 0, 0]];
    const visited = Array.from(input, (cols) => Array.from(cols, () => 0));
    visited[0][0] = 1;

    while (queue.length) {
        const [row, col, cost] = queue.shift();

        if (row === input.length - 1 && col === input.length - 1) break

        const topRow = row - 1;
        const bottomRow = row + 1;
        const leftCol = col - 1;
        const rightCol = col + 1;

        const neighbors = [];
        if (isCoord(leftCol)) neighbors.push([row, leftCol, cost + input[row][leftCol]])
        if (isCoord(rightCol)) neighbors.push([row, rightCol, cost + input[row][rightCol]])
        if (isCoord(topRow)) neighbors.push([topRow, col, cost + input[topRow][col]])
        if (isCoord(bottomRow)) neighbors.push([bottomRow, col, cost + input[bottomRow][col]])

        neighbors.forEach(([tRow, tCol, tCost]) => {
            if (tCost < safety[tRow][tCol] && !visited[tRow][tCol]) {
                safety[tRow][tCol] = tCost;
                addToQueue(queue, [tRow, tCol, tCost])
            }
        })

        visited[row][col] = true;
    }

    console.log(safety[input.length - 1][input.length - 1])
}

module.exports = run();