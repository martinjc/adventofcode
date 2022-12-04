const fs = require('fs');

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let input = fs.readFileSync('input', 'utf-8').split('\n');

let score = 0

for(line of input) {
    let chars = line.split('');
    let comp1 = chars.slice(0,chars.length/2);
    let comp2 = chars.slice(chars.length/2, chars.length);

    for(letter of letters.split('')) {
        if(comp1.includes(letter) && comp2.includes(letter)) {
            score += (letters.indexOf(letter) + 1);
        }
    }
}

console.log(score);