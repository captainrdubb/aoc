const { parseArray } = require('../helpers');
const { resolve } = require('path');

const findOverlaps = async () => {
    const data = await parseArray(resolve(__dirname, '1204_data.txt'), (line) => {
        const pairs = line.split(',');
        const first = pairs[0].split('-');
        const second = pairs[1].split('-');
        return [
            parseInt(first[0]),
            parseInt(first[1]),
            parseInt(second[0]),
            parseInt(second[1])
        ];
    });

    let overlaps = 0;
    data.forEach(([aLo, aHi, bLo, bHi]) => {
        const bInBetween = aLo <= bLo && bLo <= aHi;
        const aInBetween = bLo <= aLo && aLo <= bHi;
        if (bInBetween || aInBetween) overlaps++;
    });

    console.log(overlaps);
};

findOverlaps().catch(err => console.error(err));