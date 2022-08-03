const { ConnectedComponent } = require('./connected-components');
const assert = require('assert');

function test() {
    const graph = new ConnectedComponent(5);
    graph.connect(2, 3);
    graph.connect(3, 4);
    graph.connect(4, 5);
    graph.connect(5, 1);
    console.log(graph.disjoint);
}

test();