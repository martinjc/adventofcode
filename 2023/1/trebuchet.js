let fs = require('fs')

const re = /\d{1}/g;

let sum = 0;

const dict = {
    'one': 'one1one',
    'two': 'two2two',
    'three': 'three3three',
    'four': 'four4four',
    'five': 'five5five',
    'six': 'six6six',
    'seven': 'seven7seven',
    'eight': 'eight8eight',
    'nine': 'nine9nine'
}

// function hasNumbers(s) {
//     for(k in dict) {
//         if(s.includes(k)) return true;
//     }
//     return false;
// }

// function findFirstNumber(s) {
//     let end = s.length;
//     let num = '';
//     for(k in dict) {
//         if(s.indexOf(k) !== -1) {
//             if(s.indexOf(k) < end) {
//                 num = k;
//                 end = s.indexOf(k);
//             }  
//         }
//     }
//     return num;
// }

let input = fs.readFileSync('input', 'utf8').split('\n');
for (line of input) {
    console.log(line);
    for(k in dict) {
        line = line.replaceAll(k, dict[k]);
    }
    // while(hasNumbers(line)) {
    //     let num = findFirstNumber(line);
    //     line = line.replace(num, dict[num]);
    // }
    let digits = line.match(re);
    console.log(line);
    console.log(digits);
    console.log(digits[0], digits[digits.length - 1]);
    console.log(digits[0] + digits[digits.length - 1]);
    sum += +(digits[0] + digits[digits.length - 1]);
}
console.log(sum);