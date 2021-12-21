const { input: testInput } = require('./data/seventeen.data')

const run = () => {
    let ideal = [];
    let maxHeight = Number.NEGATIVE_INFINITY;
    const maxVelocity = testInput.x[1];
    for (let initialV = 1; initialV <= maxVelocity; ++initialV) {
        let velocity = initialV;
        let pointX = 0;
        let intTimes = [];
        let flightTime = 1;
        while (velocity > 1) {
            pointX += velocity--;
            if (testInput.x[0] <= pointX && pointX <= testInput.x[1]) {
                intTimes.push(flightTime)
            }
            flightTime++;
        }

        if (testInput.x[0] <= pointX && pointX <= testInput.x[1]) {
            intTimes.push(Number.POSITIVE_INFINITY)
        }

        if (!intTimes.length) continue;

        const firstIntTime = intTimes[0];
        const lastIntTime = intTimes[intTimes.length - 1];
        for (let initialD = testInput.y[0]; initialD < 1000; ++initialD) {
            let descentTime = 0;
            let impactTimes = [];
            let descent = initialD;
            let maxTempHeight = Number.NEGATIVE_INFINITY;
            let pointY = 0
            while (testInput.y[0] <= pointY) {
                pointY += descent--
                const isImpact = testInput.y[0] <= pointY && pointY <= testInput.y[1]
                const isTimely = isImpact && firstIntTime <= descentTime && descentTime <= lastIntTime;
                if (isImpact && isTimely) impactTimes.push(descentTime);
                if (pointY > maxTempHeight) maxTempHeight = pointY;
                descentTime++;
            }

            if (impactTimes.length && maxTempHeight > maxHeight) {
                ideal[0] = initialV;
                ideal[1] = initialD;
                maxHeight = maxTempHeight;
            }
        }
    }
    console.log(ideal, maxHeight)
}

module.exports = run()