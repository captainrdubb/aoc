const { input: octopi } = require('./data/eleven.data')

const getNeighbors = (row, col) => {
    const neighbors = [];
    const topRow = row - 1;
    const bottomRow = row + 1;
    const leftCol = col - 1;
    const rightCol = col + 1
    const topExists = topRow >= 0;
    const bottomExists = bottomRow < octopi.length;
    const leftExists = leftCol >= 0;
    const rightExists = rightCol < octopi[row].length;

    if (topExists && leftExists) {
        neighbors.push([topRow, leftCol]);
    }

    if (topExists) {
        neighbors.push([topRow, col]);
    }

    if (topExists && rightExists) {
        neighbors.push([topRow, rightCol]);
    }

    if (leftExists) {
        neighbors.push([row, leftCol]);
    }
    if (rightExists) {
        neighbors.push([row, rightCol]);
    }

    if (bottomExists && leftExists) {
        neighbors.push([bottomRow, leftCol]);
    }
    if (bottomExists) {
        neighbors.push([bottomRow, col])
    }

    if (bottomExists && rightExists) {
        neighbors.push([bottomRow, rightCol])
    }

    return neighbors;
}

const run = () => {
    for (let step = 0; step < Number.POSITIVE_INFINITY; ++step) {
        const flash = [];
        let intermediateCount = 0;
        for (let row = 0; row < octopi.length; ++row) {
            for (let col = 0; col < octopi[row].length; ++col) {
                if (octopi[row][col] > 9) {
                    intermediateCount++;
                    octopi[row][col] = 0;
                }

                octopi[row][col] += 1;
                if (octopi[row][col] > 9)
                    flash.push([row, col])
            }
        }

        if (intermediateCount === 100) {
            console.log(step);
            break;
        }

        while (flash.length) {
            const [row, col] = flash.pop();
            const neighbors = getNeighbors(row, col);
            neighbors.forEach(([row, col]) => {
                octopi[row][col] += 1;
                if (octopi[row][col] === 10) {
                    flash.push([row, col])
                }
            })
        }
    }
}

module.exports = run();