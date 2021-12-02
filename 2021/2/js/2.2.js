const { readInputSync } = require("../../lib/utils");

let data = readInputSync('input');

let horizontal = 0;
let aim = 0;
let depth = 0;

for (d of data) {
    let direction = d.split(' ')[0];
    let magnitude = +d.split(' ')[1];
    if (direction === 'down') {
        aim += magnitude;
    } else if (direction === 'up') {
        aim -= magnitude;
    } else if (direction === 'forward') {
        horizontal += magnitude;
        depth += (aim * magnitude);
    }
}

console.log(depth * horizontal);