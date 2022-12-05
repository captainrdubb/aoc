const { parseArray } = require('../helpers');

class FileNode {
    constructor({ parent, children, type, name, size }) {
        this.parent = parent;
        this.name = name;
        this.type = type;
        this.size = size;
        this.children = children;
    }
}

const findMinDeletableDir = (tree, cache) => {
    for (const child of tree.children) {
        if (child.type === 'dir') {
            findMinDeletableDir(child, cache);
        }
    }

    if (tree.size > cache.minimumAdjustment && tree.size < cache.deleteSize) {
        cache.deleteSize = tree.size;
    }
};

const isChangDir = (line) => line[1] === "cd";

const isListDir = (line) => line[1] === "ls";

const changeDir = (line, tree) => {
    const dir = line[2];

    if (dir === "..") {
        return tree.parent;
    }

    let node = tree.children.find(child => child.name === dir);

    if (!node) {
        node = new FileNode({
            parent: tree,
            name: dir,
            type: 'dir',
            size: 0,
            children: []
        });
        tree.children.push(node);
    }

    return node;
};

const appendChildren = (index, input, tree) => {
    index++;
    while (index < input.length && input[index][0] !== '$') {
        let [descriptor, name] = input[index];
        let sizeMaybe = parseInt(descriptor);
        let isNan = Number.isNaN(sizeMaybe);
        const node = new FileNode({
            parent: tree,
            name,
            type: isNan ? 'dir' : 'file',
            size: isNan ? 0 : sizeMaybe,
            children: []
        });
        tree.children.push(node);
        index++;
    }

    return index - 1;
};

const sumCandidates = (tree, cache) => {
    let size = tree.size;
    for (let child of tree.children) {
        size += sumCandidates(child, cache);
    }

    tree.size = size;

    return size;
};

const buildTree = (input) => {
    let head = new FileNode({
        parent: null,
        children: []
    });

    let temp = head;
    for (let i = 0; i < input.length; ++i) {
        const line = input[i];
        if (isChangDir(line)) {
            temp = changeDir(line, temp);
        } else if (isListDir(line)) {
            i = appendChildren(i, input, temp);
        }
    }

    const root = head.children[0];
    root.parent = null;

    return root;
};

const run = async () => {
    const input = await parseArray('./1207_data.txt', (line) => line.split(' '));
    const tree = buildTree(input);
    let cache = { size: 0 };

    sumCandidates(tree, cache);

    const totalDiskSpace = 70000000;
    const updateSize = 30000000;
    const available = totalDiskSpace - tree.size;
    const minimumAdjustment = updateSize - available;

    cache = { minimumAdjustment, deleteSize: Number.POSITIVE_INFINITY };
    findMinDeletableDir(tree, cache);
    console.log(cache.deleteSize);
};

run().catch(err => console.error(err));