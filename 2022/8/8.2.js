const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');
input = input.map(i => i.split(''));
input = input.map(i => i.map(t => +t));

console.log(input);

// i/x is rows
// j/y is column

function getLeft(x, y, trees) {
    let t = [];
    for(let j = 0; j < x; j++) {
        t.push(trees[y][j])
    }
    return t;
}

function getRight(x, y, trees) {
    let t = [];
    for(let j = trees.length-1; j > x; j--) {
        t.push(trees[y][j])
    }
    return t;
}

function getUp(x, y, trees) {
    let t = [];
    for(let i = 0; i < y; i++) {
        t.push(trees[i][x]);
    }
    return t;
}

function getDown(x, y, trees) {
    let t = [];
    for(let i = trees[0].length-1; i > y; i--) {
        t.push(trees[i][x]);
    }
    return t;
}

function checkVisible(x, y, trees) {
    let left = getLeft(x, y, trees);
    let right = getRight(x, y, trees);
    let up = getUp(x, y, trees);
    let down = getDown(x, y, trees);
    //console.log(x, y);
    //console.log(trees[y][x]);
    //console.log(left, right, up, down);
    
    let leftCount = 0;
    do {
        leftCount++;
        tree = left.pop()
        if(tree === trees[y][x]) {
            break;
        }
    } while(tree <= trees[y][x] && left.length > 0)

    let rightCount = 0;
    do {
        rightCount++;
        tree = right.pop()
        if(tree === trees[y][x]) {
            break;
        }
    } while(tree <= trees[y][x] && right.length > 0)

    let upCount = 0;
    do {
        upCount++;
        tree = up.pop()
        if(tree === trees[y][x]) {
            break;
        }
    } while(tree <= trees[y][x] && up.length > 0)

    let downCount = 0;
    do {
        downCount++;
        tree = down.pop()
        if(tree === trees[y][x]) {
            break;
        }
    } while(tree <= trees[y][x] && down.length > 0)

    //console.log(leftCount, rightCount, upCount, downCount);
    //console.log(`scenic: ${leftCount * rightCount * upCount * downCount}`)
    return (leftCount * rightCount * upCount * downCount);
}
 
let maxScenic = 0;
for(let j = 1; j < input.length-1; j++) {
    for(let i = 1; i < input[j].length-1; i++) {
        let scenic = checkVisible(j, i, input);
        if(scenic > maxScenic) {
            maxScenic = scenic;
        }
    }
}

console.log(maxScenic);
