const { input: lines } = require('./data/eight.data');

const run = () => {
    let total = 0;
    lines.forEach(line => {
        const io = line.split(/\|/);
        const input = io[0].split(/\s/);
        const output = io[1].split(/\s/);

        const keys = new Map()
        input.forEach(code => {
            const length = code.length;
            switch (length) {
                case 2:
                    keys.set(1, code);
                    break;
                case 4:
                    keys.set(4, code);
                    break;
                case 3:
                    keys.set(7, code);
                    break;
                case 7:
                    keys.set(8, code);
                    break;
            }
        })

        const isCode = ({ code, length, compare, goal }) => {
            const isLength = code.length === length;
            if (!isLength) return false;

            let count = 0;
            let compareCode = keys.get(compare);
            for (let i = 0; i < code.length; ++i) {
                if (compareCode.includes(code[i])) count++;
            }

            return count === goal;
        }

        for (let i = 0; i < output.length; ++i) {
            const code = output[i];
            const length = code.length;
            if (isCode({ code, length: 6, compare: 4, goal: 4 })) output[i] = 9;
            else if (isCode({ code, length: 6, compare: 7, goal: 3 })) output[i] = 0;
            else if (isCode({ code, length: 6, compare: 4, goal: 3 })) output[i] = 6
            else if (isCode({ code, length: 5, compare: 1, goal: 2 })) output[i] = 3
            else if (isCode({ code, length: 5, compare: 4, goal: 3 })) output[i] = 5
            else if (isCode({ code, length: 5, compare: 4, goal: 2 })) output[i] = 2
            else if (length === 7) output[i] = 8;
            else if (length === 4) output[i] = 4;
            else if (length === 3) output[i] = 7;
            else if (length === 2) output[i] = 1;
        }

        const num = Number.parseInt(output.join(''));
        console.log(num)
        total += num;
    })

    console.log(total);
}

module.exports = run();