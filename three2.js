const { sumBy } = require('lodash')
const { signals } = require('./data/clever-bits-data')

// To find oxygen generator rating, determine the most common value (0 or 1) in the current bit position,
// and keep only numbers with that bit in that position. If 0 and 1 are equally common,
// keep values with a 1 in the position being considered.
const findRating = (data, position, getSignificantBit) => {
  if (data.length <= 1) return data;

  const sum = sumBy(data, d => d[position] - 0);

  const significantBit = getSignificantBit(data.length, sum);

  const filtered = data.filter((d) => d[position] === significantBit);

  return findRating(filtered, position + 1, getSignificantBit);
};

const recursive = () => {
  const [oxRating] = findRating(signals, 0, (length, oneCount) => {
    const zeroCount = length - oneCount;
    if (oneCount > zeroCount) return '1'
    if (oneCount < zeroCount) return '0'
    return '1'
  }, true);

  const [co2Rating] = findRating(signals, 0, (length, oneCount) => {
    const zeroCount = length - oneCount;
    if (zeroCount < oneCount) return '0'
    if (zeroCount > oneCount) return '1'
    return '0'
  });

  console.log(Number.parseInt(oxRating, 2) * Number.parseInt(co2Rating, 2));
}

module.exports = recursive();
