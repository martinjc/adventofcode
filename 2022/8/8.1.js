const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');
input = input.map(i => i.split(''));

console.log(input);

// i/x is rows
// j/y is column

function getLeft(x, y, trees) {
    let t = [];
    for(let j = x-1; j >= 0; j--) {
        t.push(trees[y][j])
    }
    return t;
}

function getRight(x, y, trees) {
    let t = [];
    for(let j = x+1; j < trees.length; j++) {
        t.push(trees[y][j])
    }
    return t;
}

function getUp(x, y, trees) {
    let t = [];
    for(let i = y-1; i >= 0; i--) {
        t.push(trees[i][x]);
    }
    return t;
}

function getDown(x, y, trees) {
    let t = [];
    for(let i = y+1; i < trees[0].length; i++) {
        t.push(trees[i][x]);
    }
    return t;
}

function checkVisible(x, y, trees) {
    left = getLeft(x, y, trees);
    right = getRight(x, y, trees);
    up = getUp(x, y, trees);
    down = getDown(x, y, trees);
    return (left.every(a => +a < +trees[y][x]) || right.every(a => +a < +trees[y][x]) || up.every(a => +a < +trees[y][x]) || down.every(a => +a < +trees[y][x]))
}
 
let count = 0;
for(let j = 1; j < input.length-1; j++) {
    for(let i = 1; i < input[j].length-1; i++) {
        if(checkVisible(j, i, input)) {
            count++;
        }
    }
}

console.log(count);
console.log(count + ((input.length-1)+(input[0].length-1))*2);