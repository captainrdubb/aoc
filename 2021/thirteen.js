const { input: { dots, folds } } = require('./data/thirteen.data')
const { sortBy } = require('lodash')

const foldUp = (matrix, intercept) => {
    const difference = matrix.length - intercept;
    for (let offset = 1; offset < difference; ++offset) {
        matrix[intercept + offset].forEach((value, col) => {
            matrix[intercept - offset][col] = value || matrix[intercept - offset][col];
        })
    }

    matrix.splice(intercept);
}

const foldRight = (matrix, intercept) => {
    for (let row = 0; row < matrix.length; ++row) {
        const length = matrix[row].length - intercept;
        for (let offset = 1; offset < length; ++offset) {
            matrix[row][intercept - offset] = matrix[row][intercept + offset] || matrix[row][intercept - offset]
        }
        matrix[row].splice(intercept);
    }
}

const run = () => {
    const sortX = sortBy(dots, (d) => d[0])
    const lengthCols = sortX[sortX.length - 1][0] + 1;

    sortY = sortBy(dots, (d) => d[1])
    const lengthRows = sortY[sortY.length - 1][1] + 1;

    const matrix = Array.from({ length: lengthRows }, () => Array.from({ length: lengthCols }));

    dots.forEach(([x, y]) => {
        matrix[y][x] = '#';
    })

    folds.forEach((fold, index) => {
        const [axis, intercept] = fold.split('=')
        if (axis === 'y') foldUp(matrix, Number.parseInt(intercept));
        else foldRight(matrix, Number.parseInt(intercept));
        if (index === 0) {
            console.log(matrix.reduce((total, row) => {
                return total + row.reduce((colSum, value) => colSum + (!value ? 0 : 1), 0);
            }, 0))
        }
    })
}

module.exports = run();