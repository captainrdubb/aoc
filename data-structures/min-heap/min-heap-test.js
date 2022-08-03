const { MinHeap } = require('./min-heap');
const assert = require('assert');

function insertOneTwoThree() {
    const minHeap = new MinHeap();

    minHeap.insert(3);

    assert(3 === minHeap.getMin());

    minHeap.insert(2);

    assert(2 === minHeap.getMin());

    minHeap.insert(1);

    assert(1 === minHeap.getMin());
}

function removeOne() {
    const heap = new MinHeap();

    heap.insert(3);
    heap.insert(2);
    heap.insert(8);
    heap.insert(5);

    assert(2 === heap.getMin());

    assert(2 === heap.extractMin());

    assert(3 === heap.getMin());

    assert(3 === heap.extractMin());

    assert(5 === heap.getMin());

    console.log(heap.arr);
}

insertOneTwoThree();
removeOne();