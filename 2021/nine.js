const { matrix: matrix } = require('./data/nide.data')

const getAdjacents = (row, col) => {
    const adjacents = [];
    adjacents.push([row - 1, col])
    adjacents.push([row + 1, col])
    adjacents.push([row, col - 1])
    adjacents.push([row, col + 1])
    return adjacents;
}

const run = () => {
    const lowPoints = [];
    const sizeRows = matrix.length;
    const sizeCols = matrix[0].length;
    for (let i = 0; i < sizeRows; ++i) {
        for (let j = 0; j < sizeCols; ++j) {
            let isLowest = true;
            const target = matrix[i][j];
            const adjacents = getAdjacents(i, j);
            for (const [row, col] of adjacents) {
                if (matrix[row]?.[col] <= target) {
                    isLowest = false;
                    break;
                }
            }
            if (isLowest) lowPoints.push({ row: i, col: j, value: target });
        }
    }
    console.log(lowPoints)
    console.log(lowPoints.reduce((previous, current) => previous + current.value + 1, 0));
}

module.exports = run();