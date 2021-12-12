const { input: input } = require('./data/twelve.data')

class CaveNode {
    name;
    connections = new Set();
    constructor(name) {
        this.name = name;
    }
}

const findPaths = (origin, visited, secondVisit) => {
    let paths = 0;
    const isStart = origin.name === 'start';
    const isUpper = origin.name === origin.name.toUpperCase();
    if (!isStart && !isUpper && visited.has(origin.name)) {
        secondVisit.push(origin.name)
    }

    visited.add(origin.name);
    for (let dest of origin.connections) {
        if (dest.name === 'start') {
            continue;
        }

        if (dest.name === 'end') {
            paths += 1;
            continue;
        }

        if (!visited.has(dest.name) || !secondVisit.length || dest.name === dest.name.toUpperCase()) {
            paths += findPaths(dest, new Set(visited), [...secondVisit]);
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
    const paths = findPaths(start, new Set([start.name]), [])
    console.log(paths);
}

module.exports = run();