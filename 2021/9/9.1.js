const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

heights = [];
rows.forEach(r => heights.push(r.split('').map(n => +n)));

function getNeighbours(heights, i, j) {
    neighbours = [];
    if (i >= 1) {
        neighbours.push(heights[i - 1][j]);
    }
    if (i < heights.length-1) {
        neighbours.push(heights[i + 1][j]);
    }
    if (j >= 1) {
        neighbours.push(heights[i][j - 1]);
    }
    if (j < heights[0].length - 1) {
        neighbours.push(heights[i][j + 1]);
    }
    return neighbours;
}

let minima = [];

for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights[0].length; j++) {
        let val = heights[i][j];
        let neighbours = getNeighbours(heights, i, j);
        let lowest = neighbours.every(n => n > val);
        if (lowest) {
            minima.push(val);
        }
    }
}

sum = minima.map(m => m + 1).reduce((r, v) => r + v);
console.log(sum);