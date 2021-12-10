const { input: lines } = require('./data/ten.data')

const closingMap = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>'],
])

const points = new Map([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137],
])


const run = () => {
    const corrupt = new Set();
    lines.forEach((input, inputIndex) => {
        const expectedChar = [];
        for (let char of input) {
            const closingChar = closingMap.get(char);
            if (closingChar) expectedChar.push(closingChar);
            else if (char !== expectedChar.pop()) corrupt.add(inputIndex);

            if (corrupt[inputIndex]) break;
        }
    })

    const total = corrupt.reduce((previous, current) => {
        return previous + (points.get(current) ?? 0);
    }, 0)

    console.log(total);
}

module.exports = run();