let fs = require('fs')

let input = fs.readFileSync('input', 'utf8').split('\n');
let calories = [0];
let pointer = 0;
for (line of input) {
    if (line.length === 0) {
        pointer++;
        calories.push(0);
    } else {
        calories[pointer] += +line;
    }
}

calories = calories.sort((a, b) => b - a);

console.log(calories);
console.log(calories[0] + calories[1] + calories[2]);