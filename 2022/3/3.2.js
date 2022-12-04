const fs = require('fs');

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let input = fs.readFileSync('input', 'utf-8').split('\n');

let score = 0

for(let i = 0; i < input.length; i += 3) {
    let chars1 = input[i].split('');
    let chars2 = input[i+1].split('');
    let chars3 = input[i+2].split('');

    for(letter of letters.split('')) {
        if(chars1.includes(letter) && chars2.includes(letter) && chars3.includes(letter)) {
            score += (letters.indexOf(letter) + 1);
        }
    }
}

console.log(score);