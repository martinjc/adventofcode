const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');

let count = 0;

for(let line of input) {
    let pair1 = line.split(',')[0];
    let pair2 = line.split(',')[1];

    let p1start = +pair1.split('-')[0];
    let p2start = +pair2.split('-')[0];
    let p1end = +pair1.split('-')[1];
    let p2end = +pair2.split('-')[1];

    if (p2start >= p1start && p2end <= p1end) {
        count++;
    } else if(p1start >= p2start && p1end <= p2end) {
        count++;
    }
}

console.log(count);