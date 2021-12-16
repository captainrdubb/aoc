const { input } = require('./data/fifteen.data')
const { sortedIndexBy } = require('lodash')

const buildCave = () => {
    const size = input.length;
    const cave = Array.from(input, (cols) => Array.from(cols));
    for (let row = 0; row < size * 5; ++row) {
        cave[row] = cave[row] || [];
        for (let col = 0; col < size * 5; ++col) {
            const refRow = row % size;
            const refCol = col % size;
            const value = cave[refRow][refCol] + Math.floor(row / size) + Math.floor(col / size);
            cave[row][col] = Math.max(value % 10, 1 + value - 10)
        }
    }
    return cave;
}

const addToQueue = (queue, tuple) => {
    const index = sortedIndexBy(queue, tuple, (t) => t[2]);
    queue.splice(index, 0, tuple);
}

const pow = buildCave();
const isCoord = (coord) => -1 < coord && coord < pow.length;
const safety = Array.from(pow, (cols) => Array.from(cols, () => Number.POSITIVE_INFINITY));

const run = () => {
    const queue = [[0, 0, 0]];
    const visited = Array.from(pow, (cols) => Array.from(cols, () => 0));
    visited[0][0] = 1;

    while (queue.length) {
        const [row, col, cost] = queue.shift();

        if (row === pow.length - 1 && col === pow.length - 1) break

        const topRow = row - 1;
        const bottomRow = row + 1;
        const leftCol = col - 1;
        const rightCol = col + 1;

        const neighbors = [];
        if (isCoord(leftCol)) neighbors.push([row, leftCol, cost + pow[row][leftCol]])
        if (isCoord(rightCol)) neighbors.push([row, rightCol, cost + pow[row][rightCol]])
        if (isCoord(topRow)) neighbors.push([topRow, col, cost + pow[topRow][col]])
        if (isCoord(bottomRow)) neighbors.push([bottomRow, col, cost + pow[bottomRow][col]])

        neighbors.forEach(([tRow, tCol, tCost]) => {
            if (tCost < safety[tRow][tCol] && !visited[tRow][tCol]) {
                safety[tRow][tCol] = tCost;
                addToQueue(queue, [tRow, tCol, tCost])
            }
        })

        visited[row][col] = true;
    }

    console.log(safety[pow.length - 1][pow.length - 1])
}

module.exports = run();