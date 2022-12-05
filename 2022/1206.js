const { readFileSync } = require('fs');
const { LinkedList } = require('mnemonist');

const findHeader = () => {
    const stream = readFileSync('./1206_data.txt', 'utf-8').toString();
    let cache = new Map();
    let window = new LinkedList();
    for (let i = 0; i < 14; ++i) {
        cache.set(stream[i], (cache.get(stream[i]) || 0) + 1);
        window.push(stream[i]);
    }

    let head = 0;
    while (head <= stream.length - 14) {
        let isHeader = true;
        for ([key, value] of cache) {
            isHeader = value === 1;
            if (!isHeader) break;
        }

        if (isHeader) {
            console.log(head + 14);
            break;
        }

        const remove = window.shift();
        const rCount = cache.get(remove) - 1;
        if (rCount > 0) cache.set(remove, rCount);
        else cache.delete(remove);

        head++;
        const add = stream[head + 13];
        const aCount = cache.get(add) || 0;
        cache.set(add, aCount + 1);
        window.push(add);
    }

};

findHeader();