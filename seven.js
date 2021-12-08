const { positions } = require('./data/crabs.data')

const run = () => {
    let leastSteps = Number.POSITIVE_INFINITY;
    for (let i = 0; i < positions.length; ++i) {
        let tSteps = 0;
        const target = positions[i];
        for (let j = 0; j < positions.length; ++j) {
            tSteps += Math.abs(target - positions[j])
        }
        leastSteps = Math.min(leastSteps, tSteps);
    }
    console.log(leastSteps);
}

module.exports = run();