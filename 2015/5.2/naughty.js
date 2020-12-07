const fs = require('fs');

const repeatDual = /([a-z][a-z])\w*\1/;
const repeatGap = /([a-z])\w{1}\1/;
const threevowels = /(\w*[aeiou]\w*){3,}/;
const doubleletters = /([a-z])\1/;
const notContain = /(ab)|(cd)|(pq)|(xy)/;

let niceCount = 0;

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    lines.forEach(l => {
        if(repeatDual.test(l) && repeatGap.test(l)) {
            niceCount++;
        }
    });
    console.log(niceCount);
});