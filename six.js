const { fish: ancestors } = require('./data/six.data')

const log = false;

class Fish {
    constructor(dth, tdays, firstTerm) {
        this.d = dth;
        this.t = tdays;
        this.firstTerm = firstTerm;
    }

    gestate = () => {
        this.d += 1;
        const baby = Math.floor(Math.pow(2, (this.d / this.t)) - 1, false);
        if (log) console.log('days: %d, tdays: %d, remaining: %d, baby: %d', this.d, this.t, this.t - this.d, baby);
        if (baby) this.d = 0;
        if (baby && this.firstTerm)
            (this.t -= 2) && (this.firstTerm = false);

        return baby;
    }
}

const run = () => {
    const days = 256;
    let school = Array.from(ancestors, (dth) => new Fish(7 - dth, 7));
    for (let dth = 1; dth < days; ++dth) {
        if (log) console.log(`-----------------Day ${dth}-------------------`)
        const babies = [];
        school.forEach(f => {
            const hadBaby = f.gestate();
            if (hadBaby) babies.push(new Fish(0, 9, true))
        })
        school = school.concat(babies);
    }

    if (log) console.log(`-----------------Day ${18}-------------------`)
    school.forEach(f => f.gestate(18))

    console.log(school.length);
}

module.exports = run();