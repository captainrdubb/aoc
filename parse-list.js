const fs = require('fs');
const path = require('path');
const readline = require('readline');

const parseArrayOfArrays = (filename, parser) => new Promise((resolve, reject) => {
    const data = [[]];
    const reader = readline.createInterface({
        input: fs.createReadStream(filename, 'utf-8'),
        crlfDelay: Infinity
    });

    reader.on('line', (chunk) => {
        if (chunk) data[data.length - 1].push(parser ? parser(chunk) : chunk);
        else data.push([]);
    });

    reader.on('close', () => resolve(data));
    reader.on('error', (err) => reject(err));
});

parseArray = (filename, parser) => new Promise((resolve, reject) => {
    const data = [];
    const reader = readline.createInterface({
        input: fs.createReadStream(filename, 'utf-8'),
        crlfDelay: Infinity
    });

    reader.on('line', (chunk) => {
        if (chunk) data[data.length - 1].push(parser ? parser(chunk) : chunk);
    });

    reader.on('close', () => resolve(data));
    reader.on('error', (err) => reject(err));
});

module.exports = {
    parseArray,
    parseArrayOfArrays
};