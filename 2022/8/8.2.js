const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');
input = input.map(i => i.split(''));

console.log(input);

// i/x is rows
// j/y is column

function getLeft(x, y, trees) {
    let t = [];
    for(let j = x-1; j >= 0; j--) {
        t.push(+trees[y][j])
    }
    return t;
}

function getRight(x, y, trees) {
    let t = [];
    for(let j = x+1; j < trees.length; j++) {
        t.push(+trees[y][j])
    }
    return t;
}

function getUp(x, y, trees) {
    let t = [];
    for(let i = y-1; i >= 0; i--) {
        t.push(+trees[i][x]);
    }
    return t;
}

function getDown(x, y, trees) {
    let t = [];
    for(let i = y+1; i < trees[0].length; i++) {
        t.push(+trees[i][x]);
    }
    return t;
}

function checkVisible(x, y, trees) {
    let left = getLeft(x, y, trees);
    let right = getRight(x, y, trees);
    let up = getUp(x, y, trees);
    let down = getDown(x, y, trees);
    console.log(x, y);
    console.log(trees[y][x]);
    console.log(left, right, up, down);
    let leftCount = 0;
    for(let k = 0; k < left.length; k++) {
        if(left[k] <= +trees[y][x]) {
            leftCount++
        } 
        if(left[k] >= +trees[y][x]) {
            break;
        }
    }
    let rightCount = 0;
    for(let k = 0; k < right.length; k++) {
        if(right[k] <= +trees[y][x]) {
            rightCount++
        }
        if(right[k] >= +trees[y][x]) {
            break;
        }
    }
    let upCount = 0;
    for(let k = 0; k < up.length; k++) {
        if(up[k] <= +trees[y][x]) {
            upCount++
        }         
        if(up[k] >= +trees[y][x]) {
            break;
        }
    }
    let downCount = 0;
    for(let k = 0; k < down.length; k++) {
        if(down[k] <= +trees[y][x]) {
            downCount++
        }         
        if(down[k] >= +trees[y][x]) {
            break;
        }
    }
    console.log(leftCount, rightCount, upCount, downCount);
    console.log(`scenic: ${leftCount * rightCount * upCount * downCount}`)
    return (leftCount * rightCount * upCount * downCount);
}
 
let maxScenic = 0;
for(let j = 1; j < input.length-1; j++) {
    for(let i = 1; i < input[j].length-1; i++) {
        let scenic = checkVisible(j, i, input);
        console.log(i, j, input[j][i], scenic);
        if(scenic > maxScenic) {
            maxScenic = scenic;
        }
    }
}

console.log(maxScenic);
