const { parseArray } = require('../helpers');

const isVisibleFromAbove = (row, col, grid) => {
    const height = grid[row][col];
    for (let r = row - 1; r >= 0; --r) {
        const temp = grid[r][col];
        if (temp >= height) return false;
    }

    return true;
};

const isVisibleFromLeft = (row, col, grid) => {
    const height = grid[row][col];
    for (let c = col - 1; c >= 0; --c) {
        const temp = grid[row][c];
        if (temp >= height) return false;
    }
    return true;
};

const isVisibleFromRight = (row, col, grid, n) => {
    const height = grid[row][col];
    for (let c = col + 1; c < n; ++c) {
        const temp = grid[row][c];
        if (temp >= height) return false;
    }

    return true;
};

const isVisibleFromBelow = (row, col, grid, m) => {
    const height = grid[row][col];
    for (let r = row + 1; r < m; ++r) {
        const temp = grid[r][col];
        if (temp >= height) return false;
    }

    return true;
};

const visibleTrees = async () => {
    const grid = await parseArray('./1208_data.txt', (line) => line.split('').map(num => parseInt(num)));

    const m = grid.length;
    const n = grid[0].length;
    let visible = 0;

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            if (isVisibleFromAbove(row, col, grid) ||
                isVisibleFromLeft(row, col, grid) ||
                isVisibleFromRight(row, col, grid, n) ||
                isVisibleFromBelow(row, col, grid, m)
            ) {
                visible++;
            }
        }
    }

    console.log(visible);
};

visibleTrees().catch(err => console.log(err));