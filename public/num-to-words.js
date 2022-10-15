// based on https://gist.github.com/ForbesLindesay/5467742
// only handles up to 10000

function numToWords(num) {
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  const numStr = num.toString();

  if (num < 0) {
    throw new Error('Negative numbers are not supported.');
  }
  if (num === 0) {
    return 'zero';
  }

  if (num < 20) {
    return ones[num];
  }

  if (numStr.length === 2) {
    return `${tens[numStr[0]]} ${ones[numStr[1]]}`;
  }

  if (numStr.length === 3) {
    if (numStr[1] === '0' && numStr[2] === '0') {
      return `${ones[numStr[0]]} hundred`;
    } else {
      return `${ones[numStr[0]]} hundred and ${numToWords(
        +(numStr[1] + numStr[2])
      )}`;
    }
  }

  if (numStr.length === 4) {
    const end = +(numStr[1] + numStr[2] + numStr[3]);
    const prefix = ones[numStr[0]];
    let output = `${prefix} thousand`;
    if (end === 0) {
      return output;
    }
    if (end < 100) {
      return `${output} and ${numToWords(end)}`;
    }
    return `${output}, ${numToWords(end)}`;
  }
}
