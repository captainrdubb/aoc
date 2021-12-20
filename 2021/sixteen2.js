const { input } = require('./data/sixteen.data')

const tokens = [];

const getSum = (values) => {
    let sum = 0;
    while (values.length) {
        sum += values.pop();
    }
    return sum;
}

const getProduct = (values) => {
    let product = 1;
    while (values.length) {
        product *= values.pop();
    }
    return product;
}

const getMin = (values) => {
    let min = Number.POSITIVE_INFINITY;
    while (values.length) {
        min = Math.min(min, values.pop())
    }
    return min;
};

const getMax = (values) => {
    let max = Number.NEGATIVE_INFINITY;
    while (values.length) {
        max = Math.max(max, values.pop())
    }
    return max;
};

const greaterThan = (values) => {
    const first = values.shift();
    const second = values.shift();
    return first > second ? 1 : 0;
}

const lessThan = (values) => {
    const first = values.shift();
    const second = values.shift();
    return first < second ? 1 : 0;
}

const equals = (values) => {
    const first = values.shift();
    const second = values.shift();
    return first === second ? 1 : 0;
}

const getOperator = (type) => {
    switch (type) {
        case 0: return getSum;
        case 1: return getProduct;
        case 2: return getMin;
        case 3: return getMax;
        case 5: return greaterThan;
        case 6: return lessThan;
        case 7: return equals;
    }
}

const parseToSize = (stop, cursor, packet) => {
    let type;
    while (cursor < stop) {
        if (!Number.parseInt(packet.substring(cursor), 2)) break

        [cursor, type] = parseHeader(cursor, packet)

        if (type === 4) {
            cursor = parseLiteral(cursor, packet);
        } else {
            cursor = parseOperator(type, cursor, packet);
        }
    }

    tokens.push(')');

    return cursor;
}

const parseToCount = (cursor, packet, depth, stop) => {
    if (depth >= stop) {
        tokens.push(')');
        return cursor;
    }

    let type;

    [cursor, type] = parseHeader(cursor, packet)

    if (type === 4) {
        cursor = parseLiteral(cursor, packet);
    } else {
        cursor = parseOperator(type, cursor, packet);
    }

    return parseToCount(cursor, packet, depth + 1, stop);
}

const parseHeader = (cursor, packet) => {
    cursor += 3;
    const type = Number.parseInt(packet.substring(cursor, cursor + 3), 2);

    return [cursor + 3, type];
}

const parseLiteral = (cursor, packet) => {
    let hasMore = true;
    let literals = [];
    while (hasMore) {
        hasMore = packet[cursor] === '1';
        literals.push(packet.substring(cursor + 1, cursor + 5));
        cursor += 5;
    }
    tokens.push(Number.parseInt(literals.join(''), 2))
    return cursor;
}

const parseOperator = (type, cursor, packet) => {
    tokens.push('(');
    tokens.push(getOperator(type));
    const bitLength = packet[cursor++] === '0' ? 15 : 11;
    const sizeOrCount = Number.parseInt(packet.substring(cursor, cursor + bitLength), 2);

    cursor += bitLength;
    if (bitLength === 15) {
        cursor = parseToSize(cursor + sizeOrCount, cursor, packet);
    } else {
        cursor = parseToCount(cursor, packet, 0, sizeOrCount);
    }
    return cursor;
}

const parsePacket = (cursor, packet) => {
    let type;
    while (cursor < packet.length) {
        if (!Number.parseInt(packet.substring(cursor), 2)) break

        [cursor, type] = parseHeader(cursor, packet)

        cursor = parseOperator(type, cursor, packet);
    }
}

const run = () => {
    const packet = [];
    for (let hex of input) packet.push(Number.parseInt(hex, 16).toString(2).padStart(4, '0'));

    parsePacket(0, packet.join(''));

    const output = [];
    while (tokens.length) {
        const token = tokens.shift();
        if (token !== ')') {
            output.push(token);
        } else {
            let values = [];
            let operator;
            while (true) {
                const value = output.pop();
                if (value instanceof Function) operator = value;
                else if (value === '(') break;
                else values.unshift(value);
            }
            const result = operator(values);
            output.push(result);
        }
    }

    console.log(output)
}

module.exports = run();