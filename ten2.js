const { input: lines } = require('./data/ten.data')
const { sortBy } = require('lodash');

const closingMap = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>'],
])

const points = new Map([
    [')', 1],
    [']', 2],
    ['}', 3],
    ['>', 4],
])


const run = () => {
    //iterate test input
    const scores = [];
    const corrupt = new Set();
    lines.forEach((input, inputIndex) => {
        const expectedChar = [];
        for (let char of input) {
            const closingChar = closingMap.get(char);
            if (closingChar) expectedChar.unshift(closingChar);
            else if (char !== expectedChar.shift()) corrupt.add(inputIndex);

            if (corrupt.has(inputIndex)) break;
        }
        if (!corrupt.has(inputIndex)) {
            let score = 0;
            for (let char of expectedChar) {
                score *= 5;
                score += points.get(char);
            }
            scores.push(score);
        }
    })
    const sortedScores = sortBy(scores, s => s);
    console.log(sortedScores[Math.floor(sortedScores.length / 2)]);
}

module.exports = run();


// why won't shrimps share their treasure? because they're shellfish