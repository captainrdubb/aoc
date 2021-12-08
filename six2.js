const { fish: fishies } = require('./data/six.data')

const log = false;

const run = () => {
    let range = 18;
    let babiesByDay = Array.from({ length: 9 }, () => 0);
    fishies.forEach(d => babiesByDay[d] += 1);

    for (let i = 0; i < range; ++i) {
        const babies = babiesByDay[0];
        for (let birthDay = 0; birthDay < 8; ++birthDay) {
            babiesByDay[birthDay] = babiesByDay[birthDay + 1];
        }
        babiesByDay[6] += babies;
        babiesByDay[8] = babies;
    }

    const sum = babiesByDay.reduce((previous, current) => {
        return previous + current;
    }, 0)

    console.log(sum);
}

module.exports = run();