const fs = require('fs');

let countPossibleNext = function(adaptors, value) {
    let possible = adaptors.filter(a => {
        return (a - value > 0 && a - value <= 3);
    }).length;
    console.log(value, possible);
    if(possible > 0) {
        return possible;
    } else {
        return 1;
    }
    
}

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    let adaptors = [];
    lines.forEach(l => {
        adaptors.push(+l);
    });
    adaptors.sort((a, b) => a-b);
    adaptors.push(adaptors[adaptors.length-1] + 3);
    console.log(adaptors);
    let paths = {};
    paths[0] = 1;
    let count = 1;
    adaptors.forEach((a, i) => {
        paths[a] = 0;
        for(let j = 1; j <= 3; j++) {
            if(paths.hasOwnProperty(a-j)) {
                paths[a] += paths[a-j];
            }
        }
    });
    console.log(paths);
});