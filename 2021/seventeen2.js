const { input: testInput } = require('./data/seventeen.data')

const isBetween = (target, min, max) => min <= target && target <= max;

const run = () => {
    let impactCount = 0;
    let results = [];
    const maxVelocity = testInput.x[1];
    for (let initialV = 1; initialV <= maxVelocity; ++initialV) {
        let velocity = initialV;
        let pointX = 0;
        let flightTimes = [];
        let flightTime = 1;
        while (velocity > 1) {
            pointX += velocity--;
            if (isBetween(pointX, testInput.x[0], testInput.x[1])) {
                flightTimes.push(flightTime)
            }
            flightTime++;
        }

        const isOverTarget = isBetween(pointX, testInput.x[0], testInput.x[1]);

        if (!flightTimes.length) continue;

        const minFlightTime = flightTimes[0];
        const maxFlightTime = flightTimes[flightTimes.length - 1];
        for (let initialD = testInput.y[0]; initialD <= 1000; ++initialD) {
            let time = 0;
            let pointY = 0;
            let hit = false;
            let ascent = initialD;
            while (!hit && pointY >= testInput.y[0] && (time <= maxFlightTime || isOverTarget)) {
                time++;
                pointY += ascent--;
                if (pointY <= testInput.y[0] && time < minFlightTime) continue;
                hit = ((isOverTarget && time >= minFlightTime) || isBetween(time, minFlightTime, maxFlightTime)) && isBetween(pointY, testInput.y[0], testInput.y[1]);
            }
            if (hit) results.push([initialV, initialD]) && impactCount++;
        }
    }
    console.log(impactCount);
}

module.exports = run()