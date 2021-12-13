const { input: { dots, folds } } = require('./data/thirteen.data')
const { sortBy } = require('lodash')

const foldUp = (matrix, intercept) => {
    const difference = matrix.length - intercept;
    for (let offset = 1; offset < difference; ++offset) {
        matrix[intercept + offset].forEach((value, col) => {
            const top = matrix[intercept - offset][col];
            matrix[intercept - offset][col] = value === '.' ? top : value;
        })
    }

    matrix.splice(intercept);
}

const foldRight = (matrix, intercept) => {
    matrix.forEach(row => {
        const length = row.length - intercept;
        for (let offset = 1; offset < length; ++offset) {
            const left = row[intercept - offset];
            const right = row[intercept + offset];
            row[intercept - offset] = right === '.' ? left : right;
        }
        row.splice(intercept);
    })
}

const run = () => {
    const sortX = sortBy(dots, (d) => d[0])
    const lengthCols = sortX[sortX.length - 1][0] + 1;

    sortY = sortBy(dots, (d) => d[1])
    const lengthRows = sortY[sortY.length - 1][1] + 1;

    const matrix = Array.from({ length: lengthRows }, () => Array.from({ length: lengthCols }, () => '.'));

    dots.forEach(([x, y]) => {
        matrix[y][x] = '#';
    })

    folds.forEach((fold) => {
        const [axis, intercept] = fold.split('=')
        if (axis === 'y') foldUp(matrix, Number.parseInt(intercept));
        else foldRight(matrix, Number.parseInt(intercept));
    })

    matrix.forEach(row => console.log(row.join('')))
}

module.exports = run();