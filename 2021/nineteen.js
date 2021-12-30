const fs = require('fs');
const { testScanners: scanners } = require('./data/nineteen.data');
const { sortedIndexOf, uniqWith } = require('lodash');

class Triangle {
    constructor(theta, b, c) {
        this.theta = theta;
        this.b = b;
        this.c = c;

        this.distances = [
            Math.abs(this.theta[0] - this.b[0]),
            Math.abs(this.theta[1] - this.b[1]),
            Math.abs(this.theta[2] - this.b[2]),
            Math.abs(this.b[0] - this.c[0]),
            Math.abs(this.b[1] - this.c[1]),
            Math.abs(this.b[2] - this.c[2]),
            Math.abs(this.c[0] - this.theta[0]),
            Math.abs(this.c[1] - this.theta[1]),
            Math.abs(this.c[2] - this.theta[2]),
        ].sort((a, b) => a - b);
    }
}

const equals = (a, b) => {
    for (distance of b.distances) {
        if (sortedIndexOf(a.distances, distance) < 0) return false;
    }
    return true;
};

const triangleMemo = new Map();

const getTriangles = (scanIndex) => {
    const triangles = [];
    if (triangleMemo.has(scanIndex)) return triangleMemo.get(scanIndex);

    const scanner = scanners[scanIndex];
    for (let theta = 0; theta < scanner.length - 2; ++theta) {
        for (let b = theta + 1; b < scanner.length - 1; ++b) {
            for (let c = b + 1; c < scanner.length; ++c) {
                triangles.push(new Triangle(
                    scanner[theta],
                    scanner[b],
                    scanner[c])
                );
            }
        }
    }

    triangleMemo.set(scanIndex, triangles);

    return triangles;
};

const run = () => {
    try {
        const distinct = new Set(scanners[0]);
        const scannerStack = [0];

        while (scannerStack.length) {
            const baseIndex = scannerStack.pop();
            const baseScanner = scanners[baseIndex];
            const baseTriangles = getTriangles(baseIndex);

            for (let nextIndex in scanners) {
                if (nextIndex === baseIndex) continue;

                const dups = new Set();
                const nextScanner = scanners[nextIndex];
                const nextTriangles = getTriangles(nextIndex);


            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = run();