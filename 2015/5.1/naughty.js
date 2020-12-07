const fs = require('fs');

const threevowels = /(\w*[aeiou]\w*){3,}/;
const doubleletters = /([a-z])\1/;
const notContain = /(ab)|(cd)|(pq)|(xy)/;

let niceCount = 0;

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    lines.forEach(l => {
        if(threevowels.test(l) && doubleletters.test(l) && !notContain.test(l)) {
            niceCount++;
        }
    });
    console.log(niceCount);
});