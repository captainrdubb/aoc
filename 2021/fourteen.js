const { input:testInput } = require('./data/fourteen.data');

const getCharArray = () => {
    const chars = Array.from({ length: 65 + 27 }, (_, index) => new Rule(String.fromCharCode(65 + index)));
    return chars;
}

class Rule {
    constructor(char) {
        this.char = char;
    }

    count = 0

    pairs = []
}

const run = () => {
    const steps = Number.parseInt(process.argv[2] || 1);
    const template = testInput.start.split('');
    const rules = getCharArray();
    testInput.rules.forEach(([key, element]) => {
        const firstKey = key.charCodeAt(0);
        const secondKey = key.charCodeAt(1);
        rules[firstKey].pairs[secondKey] = element;
    })

    for (let step = 0; step < steps; ++step) {
        for (let index = 1; index < template.length; ++index) {
            const firstKey = template[index - 1].charCodeAt(0);
            const secondKey = template[index].charCodeAt(0);
            const insert = rules[firstKey].pairs[secondKey];
            if (insert) template.splice(index, 0, insert) && ++index;
        }
    }

    let maximumCount = Number.NEGATIVE_INFINITY;
    let minimumCount = Number.POSITIVE_INFINITY;
    const counts = Array.from({ length: 65 + 27 }, () => 0);
    template.forEach(char => {
        const charCode = char.charCodeAt(0);
        counts[charCode]++;
    })

    counts.forEach(c => {
        if (c === 0) return;
        maximumCount = Math.max(maximumCount, c);
        minimumCount = Math.min(minimumCount, c);
    })

    console.log(maximumCount - minimumCount)
}

module.exports = run();