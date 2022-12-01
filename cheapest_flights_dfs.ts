/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
let minPrice;
var findCheapestPrice = function (n, flights, src, dst, k) {
    k = k + 2;
    minPrice = Number.POSITIVE_INFINITY;
    const adj = Array.from({ length: n }, () => []);
    flights.forEach(([from, to, price]) => adj[from][to] = price);

    dfs(src, 1, 0, adj, new Set(), k, dst);

    return minPrice === Number.POSITIVE_INFINITY ? -1 : minPrice;
};

function dfs(start, distance, price, adj, visited, k, dst) {
    if (start === dst) minPrice = Math.min(minPrice, price);
    if (start === dst || distance >= k) return;

    visited.add(start);

    for (let i = 0; i < adj.length; ++i) {
        if (visited.has(i)) continue;
        if (adj[start][i] === undefined) continue;
        dfs(i, distance + 1, price + adj[start][i], adj, visited, k, dst);
    }

    visited.delete(start);
}