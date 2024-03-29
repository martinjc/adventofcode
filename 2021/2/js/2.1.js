const { readInputSync } = require("../../lib/utils");

let data = readInputSync('input');

let horizontal = 0
let depth = 0

for (d of data) {
    let direction = d.split(' ')[0];
    let magnitude = +d.split(' ')[1];
    if (direction === 'down') {
        depth += magnitude;
    } else if (direction === 'up') {
        depth -= magnitude;
    } else if (direction === 'forward') {
        horizontal += magnitude;
    }
}

console.log(depth * horizontal);