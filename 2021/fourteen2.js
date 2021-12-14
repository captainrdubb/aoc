const { input:testInput } = require('./data/fourteen.data');

const run = () => {
    const counts = Array.from({ length: 64 + 27 }, () => 0);
    let pairs = new Map();
    const rules = new Map();
    const steps = Number.parseInt(process.argv[2] || 1);
    const template = testInput.start;

    counts[template[0].charCodeAt(0)]++;
    for (let index = 1; index < template.length; ++index) {
        const pair = template[index - 1] + template[index];
        pairs.set(pair, (pairs.get(pair) ?? 0) + 1)
        counts[template[index].charCodeAt(0)]++;
    }

    testInput.rules.forEach(([key, element]) => rules.set(key, element))

    for (let step = 0; step < steps; ++step) {
        const temp = new Map(pairs);
        temp.forEach((count, key) => {
            if(count === 0) return;

            const insert = rules.get(key);
            if (!insert) return;

            const leftKey = key[0] + insert;
            const rightKey = insert + key[1];

            pairs.set(key, pairs.get(key) - count);
            pairs.set(leftKey, (pairs.get(leftKey) ?? 0) + count);
            pairs.set(rightKey, (pairs.get(rightKey) ?? 0) + count);
            counts[insert.charCodeAt(0)] += count;
        })
    }

    let maximumCount = Number.NEGATIVE_INFINITY;
    let minimumCount = Number.POSITIVE_INFINITY;

    counts.forEach(c => {
        if (c === 0) return;
        maximumCount = Math.max(maximumCount, c);
        minimumCount = Math.min(minimumCount, c);
    })

    console.log(maximumCount - minimumCount)
}

module.exports = run();