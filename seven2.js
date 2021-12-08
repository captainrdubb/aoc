const { positions } = require('./data/crabs.data')

const sum = (value) => {
    let sum = 0;
    for (let i = 0; i < value; ++i) {
        sum += value - i;
    }
    return sum;
}

const run = () => {
    let leastSteps = Number.POSITIVE_INFINITY;
    let maxPosition = positions.reduce((previous, current) => Math.max(previous, current), 0);
    for (let i = 0; i < maxPosition; ++i) {
        let tSteps = 0;
        const target = i;
        for (let j = 0; j < positions.length; ++j) {
            const n = Math.abs(target - positions[j])
            tSteps += n + (n * (n - 1)) / 2
        }
        leastSteps = Math.min(leastSteps, tSteps);
    }
    console.log(leastSteps);
}

module.exports = run();