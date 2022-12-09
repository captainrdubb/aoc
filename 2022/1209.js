const { writeFileSync } = require('fs');
const { parseArray } = require('../helpers');

const moveUp = (H) => H[1]++;
const moveDown = (H) => H[1]--;
const moveLeft = (H) => H[0]--;
const moveRight = (H) => H[0]++;

const adjustT = (H, T) => {
    const isAbove = H[1] > T[1];
    const isRight = H[0] > T[0];
    const changeX = H[0] - T[0];
    const changeY = H[1] - T[1];
    if ((Math.abs(changeY) > 1 && changeX !== 0) || Math.abs(changeX) > 1) {
        T[0] += (isRight ? 1 : -1);
    }

    if ((Math.abs(changeX) > 1 && changeY !== 0) || Math.abs(changeY) > 1) {
        T[1] += (isAbove ? 1 : -1);
    }
};

const move = (dir, H) => {
    switch (dir) {
        case 'U':
            return H[1]++;
        case 'D':
            return H[1]--;
        case 'L':
            return H[0]--;
        case 'R':
            return H[0]++;
    }
};

const simulate = async () => {
    const instructions = await parseArray('./1209_data.txt', (line) => line.split(' ').map(
        (value, index) => index === 1 ? parseInt(value) : value)
    );

    let knots = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ];

    let n = knots.length;
    let tMoves = new Set();
    instructions.forEach(([dir, steps]) => {
        while (steps) {
            move(dir, knots[0]);
            for (let i = 0; i < n - 1; ++i) {
                adjustT(knots[i], knots[i + 1]);
            }
            tMoves.add(`${knots[knots.length - 1]}`);
            steps--;
        }
    });

    console.log(tMoves.size);
};

simulate().catch(err => console.log(err));