const { parseArray } = require('../helpers');
const path = require('path');

const getPriority = (char) => {
    if (!char) return 0;
    let priority = char.charCodeAt(0);
    if (priority < 91) return priority - 38;
    else return priority - 96;
};

const findRepeatingItem = async () => {
    const rucksacks = await parseArray(path.resolve(__dirname, '1203_data.txt'));
    const iterations = rucksacks.length / 3;

    let cursor = 0;
    let totalPriority = 0;
    for (let iteration = 0; iteration < iterations; ++iteration) {
        let rucksackOne = rucksacks[cursor++];
        let rucksackTwo = rucksacks[cursor++];
        let rucksackThree = rucksacks[cursor++];

        let setOne = new Set(rucksackOne.split('').map(char => getPriority(char)));
        let setTwo = new Set(rucksackTwo.split('').map(char => getPriority(char)));
        let setThree = new Set(rucksackThree.split('').map(char => getPriority(char)));

        for (const pri of setOne) {
            if (setTwo.has(pri) && setThree.has(pri)) {
                totalPriority += pri;
                break;
            }
        }
    }

    console.log(totalPriority);
};

findRepeatingItem().catch(error => console.log(error));