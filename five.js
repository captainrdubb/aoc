const { lines } = require("./data/lines.data");

const run = () => {
    const matrix = [];
    lines.forEach(line => {
        const intersects = getIntersectingPoints(line);
        if (!isZeroSlope(line.start, line.stop)) return;

        intersects.forEach(point => {
            matrix[point[0]] = matrix[point[0]] ?? [];
            matrix[point[0]][point[1]] = (matrix[point[0]][point[1]] ?? 0) + 1
        })
    })

    let count = 0;
    matrix.forEach(x => {
        x.forEach(y => {
            if (y > 1) count++;
        })
    })

    console.log(matrix)
    console.log(count);
}

const isZeroSlope = (leftPoint, rightPoint) => {
    return leftPoint[0] === rightPoint[0] || leftPoint[1] === rightPoint[1];
}

const getIntersectingPoints = (line) => {
    const intersects = [];
    const x = Math.min(line.start[0], line.stop[0]);
    const y = Math.min(line.start[1], line.stop[1]);
    const xDifference = Math.abs(line.stop[0] - line.start[0]);
    const yDifference = Math.abs(line.stop[1] - line.start[1]);

    if (xDifference) {
        for (let i = 0; i <= xDifference; ++i) {
            intersects.push([x + i, y])
        }
    }

    if (yDifference) {
        for (let i = 0; i <= yDifference; ++i) {
            intersects.push([x, y + i])
        }
    }

    return intersects;
}

module.exports = run();