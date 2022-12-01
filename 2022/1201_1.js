// each ealf has inventory
// each food in inventory has calories
// total calories
// who has the most calories?
const { Heap } = require('mnemonist');
const { parseArrayOfArrays } = require('../parse-list');
const { resolve } = require('path');

const whoHasTheMostCalories = async () => {
    const data = await parseArrayOfArrays(resolve(__dirname, '1201_1.data.txt'), parseInt);

    const heap = new Heap((a, b) => {
        return b.total - a.total;
    });

    data.forEach((elf, id) => {
        const sum = elf.reduce((prev, curr) => {
            return prev + curr;
        }, 0);

        heap.push({ total: sum, id, pack: elf });
    });

    let sum = 0;
    for (let i = 0; i < 3; ++i) {
        const hero = heap.pop();
        sum += hero.total;
    }

    console.log(sum);
};

whoHasTheMostCalories().catch(err => console.log(err));