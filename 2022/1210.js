const { parseArray } = require('../helpers');
const { Queue } = require('mnemonist');

const run = async () => {
    const instructions = await parseArray('./1210_data.txt', (line) => line.split(' '));
    const queue = new Queue();
    let register = 1;
    let ticks = 0;
    let screen = Array.from({ length: 6 }, () => Array.from({ length: 40 }, () => '.'));

    instructions.forEach(([op, num]) => {
        switch (op) {
            case 'noop':
                queue.enqueue('noop');
                break;
            case 'addx':
                queue.enqueue('wait');
                queue.enqueue(num);
                break;
        }
    });

    // console.log(stack);

    while (queue.size) {
        const cycle = Math.floor(ticks / 40);
        if (Math.abs((ticks % 40) - register) < 2) screen[cycle][ticks % 40] = '#';

        const value = parseInt(queue.dequeue());
        if (!Number.isNaN(value)) register += value;
        ticks++;
    }

    console.log(screen.map(line => line.join('')).join('\n'));
};

run().catch(err => console.log(err));