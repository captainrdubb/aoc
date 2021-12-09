const { matrix: matrix } = require('./data/nide.data')

const notVisited = (value) => value !== undefined && !value;

const getAdjacents = (row, col, visited) => {
    const adjacents = [];
    if (notVisited(visited[row - 1]?.[col])) (visited[row - 1][col] = true) && adjacents.push([row - 1, col])
    if (notVisited(visited[row + 1]?.[col])) (visited[row + 1][col] = true) && adjacents.push([row + 1, col])
    if (notVisited(visited[row][col - 1])) (visited[row][col - 1] = true) && adjacents.push([row, col - 1])
    if (notVisited(visited[row][col + 1])) (visited[row][col + 1] = true) && adjacents.push([row, col + 1])
    return adjacents;
}

const run = () => {
    const basins = [];
    const visited = Array.from(matrix, (row) => Array.from(row, () => false));
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[i].length; ++j) {
            let basin = 0;
            const points = [];
            if (!visited[i][j]) points.push([i, j]);
            visited[i][j] = true;

            while (points.length) {
                const [row, col] = points.pop();
                const value = matrix[row][col];

                if (value !== 9) {
                    basin++;
                    if (i === 0 && j === 5) console.log(value)
                    const adjacents = getAdjacents(row, col, visited);
                    adjacents.forEach(adj => points.push(adj))
                }
            }
            basins.push(basin);
        }
    }
    const sortedBasins = basins.sort((a, b) => b - a);
    console.log(sortedBasins[0] * sortedBasins[1] * sortedBasins[2]);
}

module.exports = run();