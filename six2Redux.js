const { testFish: fishies } = require('./data/six.data')

//I love this one!!

const run = () => {
    const observedDays = 256;
    const daysToFirstBirth = 9;
    const daysToRemainingBirths = 7;
    const dueDays = Array.from({ length: daysToFirstBirth }, () => 0);
    fishies.forEach(dueIn => dueDays[dueIn] += 1);

    for (let day = 0; day < observedDays; ++day) {
        const arrivalDay = day % daysToFirstBirth;
        const arrivals = dueDays[arrivalDay];
        dueDays[(arrivalDay + daysToFirstBirth) % 9] += arrivals;
        dueDays[(arrivalDay + daysToRemainingBirths) % 9] += arrivals;
        dueDays[arrivalDay] = Math.max(0, dueDays[arrivalDay] - arrivals);
    }

    const sum = dueDays.reduce((previous, current) => previous + current, 0);
    console.log(sum);
}

module.exports = run();