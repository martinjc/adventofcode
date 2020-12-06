const fs = require('fs');

console.log('b'.charCodeAt(0));

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    let groups = [];
    let g = [];
    lines.forEach((l) => {
        if(l === '') {
            groups.push(g);
            g = [];
        } else {
            g.push(l);
        }
    });
    let total = 0;
    groups.forEach(g => {
        let characters = new Set();
        g.forEach(string => {
            for(let i = 0; i < string.length; i++) {
                characters.add(string[i]);
            }
        });
        console.log(g, characters, characters.size);
        total += characters.size;
    });
    console.log(total);
});