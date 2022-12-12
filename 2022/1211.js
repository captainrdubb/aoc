const { MaxHeap } = require('mnemonist');

const monkeys = [
    {
        items: [80],
        operation: (i) => i * 5,
        test: (v) => v % 2 === 0,
        true: 4,
        false: 3,
        inspections: 0
    },
    {
        items: [75, 83, 74],
        operation: (i) => i + 7,
        test: (v) => v % 7 === 0,
        true: 5,
        false: 6,
        inspections: 0,
    },
    {
        items: [86, 67, 61, 96, 52, 63, 73],
        operation: (i) => i + 5,
        test: (v) => v % 3 === 0,
        true: 7,
        false: 0,
        inspections: 0,
    },
    {
        items: [85, 83, 55, 85, 57, 70, 85, 52],
        operation: (i) => i + 8,
        test: (v) => v % 17 === 0,
        true: 1,
        false: 5,
        inspections: 0,
    },
    {

        items: [67, 75, 91, 72, 89],
        operation: (i) => i + 4,
        test: (v) => v % 11 === 0,
        true: 3,
        false: 1,
        inspections: 0
    },
    {

        items: [66, 64, 68, 92, 68, 77],
        operation: (i) => i * 2,
        test: (v) => v % 19 === 0,
        true: 6,
        false: 2,
        inspections: 0
    },
    {

        items: [97, 94, 79, 88],
        operation: (i) => i * i,
        test: (v) => v % 5 === 0,
        true: 2,
        false: 7,
        inspections: 0
    },
    {

        items: [77, 85],
        operation: (i) => i + 6,
        test: (v) => v % 13 === 0,
        true: 4,
        false: 0,
        inspections: 0
    },
];

const shinanigans = () => {
    let round = 0;
    const modulus = 2 * 7 * 3 * 17 * 11 * 19 * 5 * 13;
    while (round < 10000) {
        for (let i = 0; i < monkeys.length; ++i) {
            const monkey = monkeys[i];
            while (monkey.items.length) {
                monkey.inspections++;
                const item = monkey.items.shift();
                let value = monkey.operation(item);
                value %= modulus;
                const result = monkey.test(value);
                const next = monkey[`${result}`];
                monkeys[next].items.push(value);
            }
        }
        round++;
    }

    const heap = new MaxHeap((a, b) => {
        return a.inspections - b.inspections;
    });

    monkeys.forEach(monkey => heap.push(monkey));

    const first = heap.pop().inspections;
    const second = heap.pop().inspections;

    console.log(first, second, first * second);
};

shinanigans();



