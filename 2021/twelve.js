const { input: input } = require('./data/twelve.data')

class CaveNode {
    name;
    connections = new Set();
    constructor(name) {
        this.name = name;
    }
}

const findPaths = (origin, path, visited) => {
    let paths = 0;
    visited.add(origin.name);
    for (let dest of origin.connections) {
        if (dest.name === 'end') {
            paths += 1;
            continue;
        }

        if (!visited.has(dest.name) || dest.name === dest.name.toUpperCase()) {
            paths += findPaths(dest, [...path, dest.name], new Set(visited));
        }
    };
    return paths;
}

const run = () => {
    const nodes = new Map();
    input.forEach(component => {
        const labels = component.split('-');
        const nodeOne = nodes.get(labels[0]) ?? new CaveNode(labels[0]);
        const nodeTwo = nodes.get(labels[1]) ?? new CaveNode(labels[1]);
        nodeOne.connections.add(nodeTwo);
        nodeTwo.connections.add(nodeOne);
        nodes.set(labels[0], nodeOne)
        nodes.set(labels[1], nodeTwo)
    })

    const start = nodes.get('start');
    const paths = findPaths(start, [start.name], new Set([start.name]))
    console.log(paths);
}

module.exports = run();