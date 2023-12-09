let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n');

let nexts = [];

for(line of input) {
    let sequence = line.match(/-*(\d+)/g).map(i => +i);
    let levels = [sequence];
    while(levels[levels.length-1].some(i => i !== 0)) {
        let level = [];
        for(let i = 0; i < levels[levels.length-1].length-1; i++) {
            a = levels[levels.length-1][i];
            b = levels[levels.length-1][i+1];
            let difference = b - a;
            level.push(difference);
        }
        levels.push(level);
    }
    levels = levels.reverse();
    let next = levels.reduce((a, c) => { 
        c.push(c[c.length-1] + a[a.length-1]);
        return c; 
    });
    nexts.push(next[next.length-1]);
}

console.log(nexts);
console.log(nexts.reduce((a, v) => a + v, 0));