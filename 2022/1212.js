const { parseArray } = require('../helpers');
const { LinkedList } = require('mnemonist');

const neighbors = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const getElevation = (char) => {
    if (char === 'S') char = 'a';
    if (char === 'E') char = 'z';
    return char.charCodeAt(0) - 96;
};

const DISTANCE = 0;
const VISITED = 1;

const shortestPath = async () => {
    const matrix = await parseArray('./1212_data.txt', line => line.split(''));
    const m = matrix.length;
    const n = matrix[0].length;

    let end;
    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            if (matrix[row][col] === 'E') {
                end = [row, col];
                break;
            }
        }
        if (end) break;
    }

    let shortest = Number.POSITIVE_INFINITY;
    const queue = new LinkedList();
    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            if (getElevation(matrix[row][col]) !== 1) continue;

            queue.clear();
            const cache = Array.from(matrix, row => Array.from(row, () => [Number.POSITIVE_INFINITY, false]));
            cache[row][col][DISTANCE] = 0;
            cache[row][col][VISITED] = true;
            queue.push([row, col]);

            while (queue.size) {
                const [row, col] = queue.shift();
                const elevation = getElevation(matrix[row][col]);

                if (row === end[0] && col === end[1]) {
                    break;
                }

                neighbors.forEach((neighbor) => {
                    const [rOffset, cOffset] = neighbor;
                    const nRow = row + rOffset;
                    const nCol = col + cOffset;

                    if (nRow === -1 || nRow === m) return;
                    if (nCol === -1 || nCol === n) return;
                    if (cache[nRow][nCol][VISITED]) return;

                    const nElevation = getElevation(matrix[nRow][nCol]);
                    const relative = nElevation - elevation;
                    if (relative > 1) return;

                    cache[nRow][nCol][DISTANCE] = cache[row][col][DISTANCE] + 1;
                    cache[nRow][nCol][VISITED] = cache[row][col][VISITED] = true;
                    queue.push([nRow, nCol]);
                });
            }
            shortest = Math.min(shortest, cache[end[0]][end[1]][DISTANCE]);
        }
    }

    console.log(shortest);
};

shortestPath().catch(err => console.log(err));