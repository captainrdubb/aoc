const { parseArray } = require('../helpers');

const countAbove = (row, col, grid) => {
    let view = 0;
    const height = grid[row][col];
    for (let r = row - 1; r >= 0; --r) {
        view++;
        const temp = grid[r][col];
        if (temp >= height) break;
    }

    return view;
};

const countLeft = (row, col, grid) => {
    let view = 0;
    const height = grid[row][col];
    for (let c = col - 1; c >= 0; --c) {
        view++;
        const temp = grid[row][c];
        if (temp >= height) break;
    }
    return view;
};

const countRight = (row, col, grid, n) => {
    let view = 0;
    const height = grid[row][col];
    for (let c = col + 1; c < n; ++c) {
        view++;
        const temp = grid[row][c];
        if (temp >= height) break;
    }

    return view;
};

const countBelow = (row, col, grid, m) => {
    let view = 0;
    const height = grid[row][col];
    for (let r = row + 1; r < m; ++r) {
        view++;
        const temp = grid[r][col];
        if (temp >= height) break;
    }

    return view;
};

const visibleTrees = async () => {
    const grid = await parseArray('./1208_data.txt', (line) => line.split('').map(num => parseInt(num)));

    const m = grid.length;
    const n = grid[0].length;
    let maxView = Number.NEGATIVE_INFINITY;

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            const viewAbove = countAbove(row, col, grid);
            const viewLeft = countLeft(row, col, grid);
            const viewRight = countRight(row, col, grid, n);
            const viewBelow = countBelow(row, col, grid, m);
            if (row === 1 && col === 2) {
                console.log(viewAbove, viewLeft, viewBelow, viewRight);
            }
            maxView = Math.max(maxView, viewAbove * viewLeft * viewRight * viewBelow);
        }
    }

    console.log(maxView);
};

visibleTrees().catch(err => console.log(err));