/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
    k = k + 2;
    const adj = Array.from({ length: n }, () => []);
    flights.forEach(([from, to, price]) => adj[from][to] = price);

    const stack = [[src, 1, 0]];

    let minPrice = Number.POSITIVE_INFINITY;

    while (stack.length) {
        const [from, distance, price] = stack.pop();

        if (from === dst) minPrice = Math.min(minPrice, price);

        if (from === dst || distance >= k) continue;

        for (let to = 0; to < n; ++to) {
            if (adj[from][to] === undefined) continue;
            stack.unshift([to, distance + 1, price + adj[from][to]]);
        }

        visited.add(from);
    }

    return minPrice === Number.POSITIVE_INFINITY ? -1 : minPrice;
};