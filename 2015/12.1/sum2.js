const fs = require('fs');

let input = JSON.parse(fs.readFileSync('input', 'utf8'));

function parse(input, sum) {
    if (typeof (input) === 'string') {
        return 0;
    } else if (typeof (input) === 'object') {
        if (Array.isArray(input)) {
            for (element of input) {
                sum += parse(element, 0);
            }
        } else {
            if (!Object.values(input).includes('red')) {
                for (key in input) {
                    sum += parse(input[key], 0);
                }
            }

        }
    } else if(typeof(input) === 'number') {
        return input;
    }
    return sum;
}

let sum = parse(input, 0);
console.log(sum);