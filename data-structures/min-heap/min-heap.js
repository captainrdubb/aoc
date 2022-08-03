parent = (index) => (index - 1) >>> 2;

left = (index) => index * 2 + 1;

right = (index) => index * 2 + 2;

swap = (l, r, arr) => {
    const temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
};

minHeapify = (index, arr) => {
    let smallest = index;
    let l = left(index);
    let r = right(index);
    if (l < arr.length && arr[l] < arr[smallest]) {
        smallest = l;
    }
    if (r < arr.length && arr[r] < arr[smallest]) {
        smallest = r;
    }
    if (smallest != index) {
        swap(smallest, index, arr);
        minHeapify(smallest, arr);
    }
};

module.exports.MinHeap = class {
    constructor() {
        this.arr = [];
    }

    insert = (value) => {
        this.arr.push(value);
        let i = this.arr.length - 1;
        while (i !== 0 && this.arr[parent(i)] > this.arr[i]) {
            swap(parent(i), i, this.arr);
        }
    };

    getMin = () => this.arr[0];

    extractMin = () => {
        const min = this.arr[0];
        this.arr[0] = this.arr.pop();
        minHeapify(0, this.arr);
        return min;
    };
};
