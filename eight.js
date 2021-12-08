const { input: lines } = require('./data/eight.data');

2, 4, 3, 7

const run = () => {
    let count = 0;
    lines.forEach(line => {
        const io = line.split(/\|/);
        const output = io[1].split(/\s/);
        output.forEach(o => {
            const length = o.length;
            if (length === 2) count++;
            if (length === 4) count++;
            if (length === 3) count++;
            if (length === 7) count++;
        })
    })

    console.log(count);
}

module.exports = run();