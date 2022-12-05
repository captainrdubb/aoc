const { parseArray } = require('../helpers');
const path = require('path');

const moveCrates = async () => {
    const lines = await parseArray(path.resolve(__dirname, './1205_data_a.txt'));
    const columnIds = [];
    const pattern = /\d{1}/g;
    while ((match = pattern.exec(lines[lines.length - 1])) !== null) {
        columnIds.push(match.index);
    }

    const columns = Array.from({ length: columnIds.length + 1 }, () => []);
    for (let level = 0; level < lines.length - 1; ++level) {
        const line = lines[level];
        columnIds.forEach((columnId, i) => {
            if (/[A-Z]/.test(line[columnId])) {
                columns[i + 1].push(line[columnId]);
            }
        });
    }

    const instructions = await parseArray(path.resolve(__dirname, './1205_data_b.txt'), (line) => {
        const details = line.split(',');
        return [
            parseInt(details[0]),
            parseInt(details[1]),
            parseInt(details[2])
        ];
    });

    for (const instruction of instructions) {
        const from = instruction[1];
        const to = instruction[2];
        const count = instruction[0];
        let ordered = [];
        for (let i = 0; i < count; ++i) {
            let crate = columns[from].shift();
            ordered.push(crate);
        }

        while (ordered.length) {
            columns[to].unshift(ordered.pop());
        }
    }

    console.log(columns.map(column => column[0]));
};

moveCrates().catch(err => console.error(err));