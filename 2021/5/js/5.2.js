const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let numbers = rows.map(r => r.split(' -> '));
console.log(numbers);
numbers = numbers.map(r => {
    r[0] = r[0].split(',').map(n => +n);
    r[1] = r[1].split(',').map(n => +n);
    return r;
});
console.log(numbers);

let maxX = 0;
let maxY = 0;

numbers.forEach(n => {
    if (n[0][0] > maxX) {
        maxX = n[0][0];
    }
    if (n[1][0] > maxX) {
        maxX = n[1][0];
    }
    if (n[0][1] > maxY) {
        maxY = n[0][1];
    }
    if (n[1][1] > maxY) {
        maxY = n[1][1];
    }
});

let vents = [];
for (let i = 0; i < maxX+1; i++) {
    vents.push(new Array(maxY + 1).fill(0))
}

for (let k = 0; k < numbers.length; k++) {
    n = numbers[k];

    if (n[0][0] == n[1][0]) {
        // fill a line
        for (let i = Math.min(n[0][1], n[1][1]); i <= Math.max(n[0][1], n[1][1]); i++) {
            vents[i][n[0][0]]++;
        }
    }
    if (n[0][1] == n[1][1]) {
        // fill a column
        for (let i = Math.min(n[0][0], n[1][0]); i <= Math.max(n[1][0], n[0][0]); i++) {
            vents[n[0][1]][i]++;
        }
    }
    if ((n[0][0] != n[1][0]) && (n[0][1] != n[1][1])) {
        console.log(n);
        let xDirection = (n[1][0] - n[0][0]) / Math.abs(n[1][0] - n[0][0]);
        let yDirection = (n[1][1] - n[0][1]) / Math.abs(n[1][1] - n[0][1]);
        console.log(xDirection, yDirection);

        let xCoord = n[0][0];
        let yCoord = n[0][1];
        for (let i = 0; i <= Math.abs(n[1][0] - n[0][0]); i++) {
            vents[yCoord][xCoord]++;
            xCoord += xDirection;
            yCoord += yDirection;
        }
    }
}
console.log(vents);
console.log(vents.flat().filter(n => n >= 2).length);