const { testInput, expect } = require('./data/eighteen.data')
const { isEqual } = require('lodash')

let logger;

class NumberNode {
    constructor(parent, values) {
        this.parent = parent;
        this.left = getValueOrNode(this, values[0])
        this.right = getValueOrNode(this, values[1])
    }

    add = (value, prop) => this[prop] += value;

    addLeft = (node, value) => {
        let move = this;
        let previous = node;
        if (move.left === previous) {
            previous = move;
            move = move.parent;
            move?.addLeft(this, value);
        } else if (Number.isInteger(move.left)) {
            move.left += value;
        } else if (move?.left instanceof NumberNode) {
            move = move.left;
            while (move.right instanceof NumberNode) {
                move = move.right;
            }
            move.right += value;
        }
    }

    addRight = (node, value) => {
        let move = this;
        let previous = node;
        if (move.right === previous) {
            previous = move;
            move = move.parent;
            move?.addRight(this, value);
        } else if (Number.isInteger(move?.right)) {
            move.right += value;
        } else if (move?.right instanceof NumberNode) {
            move = move.right;
            while (move.left instanceof NumberNode) {
                move = move.left;
            }
            move.left += value;
        }
    }

    toArray = () => {
        const pow = [];
        const left = getValueOrArray(this.left);
        const right = getValueOrArray(this.right);
        if (left !== null) pow.push(left);
        if (right !== null) pow.push(right);
        return pow;
    }
}

const getValueOrArray = (value) => {
    if (value instanceof NumberNode) return value.toArray();
    if (Number.isInteger(value)) return value;
    return null;
}

const getValueOrNode = (parent, value) => {
    if (value instanceof Array) return new NumberNode(parent, value)
    if (Number.isInteger(value)) return value;
    return null;
}

const getMagnitude = (node) => {
    const leftMag = Number.isInteger(node.left) ? node.left * 3 : getMagnitude(node.left) * 3;
    const rightMag = Number.isInteger(node.right) ? node.right * 2 : getMagnitude(node.right) * 2;
    return leftMag + rightMag;
}

const split = ({ node, value }) => {
    const newValue = [Math.floor(value / 2), Math.ceil(value / 2)]
    const childName = node.left === value ? 'left' : 'right';
    node[childName] = new NumberNode(node, newValue);
    logger(`SPLIT ${value}`)
    return true;
}

const explode = ({ node }) => {
    const { parent } = node;
    parent.addLeft(node, node.left);
    parent.addRight(node, node.right);
    if (parent.left === node) parent.left = 0;
    if (parent.right === node) parent.right = 0;
    logger(`EXPLODE [${node.left},${node.right}]`)
    return true;
}

const findExplosion = ({ node, depth }) => {
    if (node === null || node === undefined) return false;

    if (findExplosion({ node: node.left, depth: depth + 1 })) return true;
    if (findExplosion({ node: node.right, depth: depth + 1 })) return true;

    if (depth > 3 && Number.isInteger(node.left) && Number.isInteger(node.right)) {
        return explode({ node })
    }
}

const findSplit = ({ node }) => {
    if (node === null || node === undefined) return false;

    if (node.left > 9) {
        return split({ node, value: node.left })
    }

    if (findSplit({ node: node.left })) return true;

    if (node.right > 9) {
        return split({ node, value: node.right })
    }

    if (findSplit({ node: node.right })) return true;
}

const run = () => {
    let root;
    let previous = testInput[0];
    for (let i = 1; i < testInput.length; ++i) {
        previous = [previous, testInput[i]];

        root = new NumberNode(null, previous)
        logger = i == 4 ? (str) => console.log(`${str}\t\t` + JSON.stringify(root.toArray())) : () => undefined;

        logger('BEGIN\t')
        let keepReducing = true;
        while (keepReducing) {
            keepReducing = findExplosion({ node: root, depth: 0 });
            if (!keepReducing) keepReducing = findSplit({ node: root })
        }

        previous = root.toArray();
    }

    const magnitude = getMagnitude(root);

    logger('END\t')
    console.log('---------------------')
    console.log(magnitude)
}

module.exports = run();