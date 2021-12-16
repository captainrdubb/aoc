const { testInput } = require('./data/twentyfive.data');
// Set the value to itself multiplied by the subject number.
// Set the value to the remainder after dividing the value by 20201227.
const run = () => {
    let loops = 8;
    let subject = 7;
    let publicKey = 1;
    const dividend = 20201227;
    for (let loop = 0; loop < loops; ++loop) {
        publicKey = publicKey * subject;
    }

    console.log(publicKey);
}

module.exports = run();