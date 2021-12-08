const { lines } = require("./data/lines.data");

const run = () => {
    const matrix = [];
    lines.forEach(line => {
        const intersects = getIntersectingPoints(line);
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

const getDimms = ({ stop, start }) => {
    const xDifference = stop[0] - start[0];
    const yDifference = stop[1] - start[1];
    return [xDifference, yDifference];
}

const getIntersectingPoints = (line) => {
    const intersects = [];
    const [changeX, changeY] = getDimms(line);
    const shouldContinue = (i, change) => Math.abs(i) < Math.abs(change);
    const increment = (i, change) => {
        if (change === i) return 0;
        if (change > i) return 1;
        return -1;
    }

    for (let x = 0, y = 0; shouldContinue(x, changeX) || shouldContinue(y, changeY); x += increment(x, changeX), y += increment(y, changeY)) {
        intersects.push([line.start[0] + x, line.start[1] + y])
    }

    intersects.push(line.stop);

    return intersects;
}

module.exports = run();