class ConnectedComponent {
    constructor(n) {
        this.size = Array.from({ length: n + 1 }, () => 1);
        this.disjoint = Array.from({ length: n + 1 }, () => -1);
    }

    connect = (a, b) => {
        const aRoot = this.getRoot(a);
        const bRoot = this.getRoot(b);
        if (aRoot === bRoot) return;
        if (this.size[aRoot] > this.size[bRoot]) {
            this.disjoint[bRoot] = aRoot;
            this.size[aRoot] += this.size[bRoot];
        } else {
            this.disjoint[aRoot] = bRoot;
            this.size[bRoot] += this.size[aRoot];
        }
    };

    query = () => {
        const set = new Set();
        for (let i = 1; i < this.disjoint.length; ++i) {
            set.add(this.getRoot(i));
        }
        return set.size;
    };

    getRoot = (node) => {
        let last = node;
        while (this.disjoint[node] !== -1) {
            this.disjoint[last] = this.disjoint[node];
            node = this.disjoint[node];
            this.last = node;
        }
        return node;
    };
}

module.exports.ConnectedComponent = ConnectedComponent;

// [-1, -1, -1, -1, -1]
// [-1, 3, 4, 5, -1];
