const mod = (len, num, divisor) => {
    let numerator = 0;
    for (let i = 0; i < num.length; ++i) {
        numerator = numerator * 10 + num[i];
        if (numerator < divisor) continue;

        const factor = Math.floor(numerator / divisor);
        numerator -= divisor * factor;
    } ``;
    return numerator;
};

const carryValue = (value, arr, index) => {
    if (!value) return;
    const newValue = arr[index] + value;
    carryValue(Math.floor(newValue / 10), arr, index - 1);
    arr[index] = newValue % 10;
};


const multiply = (left, right) => {
    let length = left.length + right.length;
    const product = Array.from({ length }, () => 0);
    let place = 1;

    left.forEach(l => {
        right.forEach((r, offset) => {
            const temp = product[place + offset] + l * r;
            carryValue(Math.floor(temp / 10), product, place + offset - 1);
            product[place + offset] = temp % 10;
        });
        place++;
    });
    return product;
};

const add = (left, right) => {
    const top = left.length > right.length ? left : right;
    const bot = left.length > right.length ? right : left;

    const prefix = [];
    for (let i = top.length - 1; i >= 0; --i) {
        const temp = top[i] + (bot[i - (top.length - bot.length)] || 0);
        const carry = Math.floor(temp / 10);
        if (i - 1 > -1) carryValue(carry, top, i - 1);
        else if (carry) prefix.push(carry);
        top[i] = temp % 10;
    }

    return prefix.concat(top);
};

console.log(mod(1, [1, 3, 5, 2, 4, 5, 9, 8, 3, 4, 7, 5, 0, 9, 8, 3, 7, 4, 5, 0, 9, 8, 3, 4, 7, 5, 9, 8, 3, 7, 4, 0, 5, 9, 8, 7, 3, 4, 5], 3));
console.log(multiply([7, 9], [9]));
console.log(add([8, 9, 3, 0], [1, 5, 0]));