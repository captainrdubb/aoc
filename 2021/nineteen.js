const fs = require('fs');
const { sortedIndex } = require('lodash');
const { testScanners: scanners } = require('./data/nineteen.data');

const addBeacon = (beacons = [], beacon) => {
    const index = sortedIndex(beacons, beacon);
    if (beacons[index] !== beacon) beacons.splice(index, 0, beacon);
    return beacons;
};

const findUniqueBeacons = (master, scanner) => {
    const unique = new Set();
    const matchedAxes = new Set();
    const distances = [new Map(), new Map(), new Map()];

    // for each axis
    for (let axis = 0; axis < 3; ++axis) {
        // compare the _ axis of...
        for (let mAxis = 0; mAxis < 3; ++mAxis) {
            if (matchedAxes.has(mAxis)) continue;

            // each beacon
            for (const [beaconIndex, beacon] of scanner.entries()) {
                // to each master beacon
                for (const mBeacon of master) {
                    const dOne = beacon[axis] + mBeacon[mAxis];
                    const dTwo = (-beacon[axis]) + mBeacon[mAxis];
                    const dThree = beacon[axis] + (-mBeacon[mAxis]);
                    const dFour = (-beacon[axis]) + (-mBeacon[mAxis]);
                    distances[axis].set(dOne, addBeacon(distances[axis].get(dOne), beaconIndex));
                    distances[axis].set(dTwo, addBeacon(distances[axis].get(dTwo), beaconIndex));
                    distances[axis].set(dThree, addBeacon(distances[axis].get(dThree), beaconIndex));
                    distances[axis].set(dFour, addBeacon(distances[axis].get(dFour), beaconIndex));
                }
            }

            // if there are 12 hits
            for (const [, size] of distances) {
                if (size >= 12) {
                    matchedAxes.add(mAxis);

                }
            }

            if (matchedAxes.has(mAxis)) break;
        }
    }



    return unique;
};

const run = () => {
    try {
        // const master = scanners.shift();
        // while (scanners.length > 0) {
        //     const scanner = scanners.shift();
        //     const unique = findUniqueBeacons(master, scanner);
        //     unique.forEach(bIndex => master.push(scanner[bIndex]));
        // }
        // console.log('You have %d distinct beacons', master.length);
        const unique = findUniqueBeacons(scanners[0], scanners[1]);
        console.log('Scanner 0 has %d unique beacons', unique.size);
    } catch (error) {
        console.log(error);
    }
};

module.exports = run();