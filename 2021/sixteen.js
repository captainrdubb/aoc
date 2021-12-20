const { testInput: input } = require('./data/sixteen.data')

const parseLiterals = (packet) => {
    let cursor = 0;
    let hasMore = Number.parseInt(packet, 2) > 0;
    while (hasMore) {
        hasMore = packet[cursor] === '1';
        cursor += 5;
    }

    return countVersions(packet.substring(cursor))
}

const countVersions = (packet) => {
    if (!packet || !Number.parseInt(packet, 2)) return 0;

    let cursor = 0;
    const version = Number.parseInt(packet.substring(cursor, cursor + 3), 2);

    cursor += 3;
    const type = Number.parseInt(packet.substring(cursor, cursor + 3), 2);

    console.log('version: %d, type: %d', version, type);

    cursor += 3;
    if (type === 4) {
        return version + parseLiterals(packet.substring(cursor))
    }
    else {
        const length = packet[cursor++] === '0' ? 15 : 11;
        const sizeOrCount = Number.parseInt(packet.substring(cursor, cursor + length));

        cursor += length;
        if (length === 11) {
            return version + countVersions(packet.substring(cursor));
        } else {
            let sum = version;
            sum += countVersions(packet.substring(cursor, cursor + sizeOrCount));

            cursor += sizeOrCount;
            sum += countVersions(packet.substring(cursor));
            return sum;
        }
    }
}

const run = () => {
    console.log(input)
    const packet = [];
    for (let hex of input) packet.push(Number.parseInt(hex, 16).toString(2).padStart(4, '0'));
    const binPacket = packet.join('');
    const versions = countVersions(binPacket);
    console.log(binPacket)
    console.log(versions)
}

module.exports = run();