const fs = require('fs');

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    let passports = [];
    let p = {};
    lines.forEach((l) => {
        if(l === '') {
            passports.push(p);
            p = {};
        } else {
            let fields = l.split(' ');
            fields.forEach(f => {
                let k = f.split(':')[0];
                let v = f.split(':')[1];
                p[k] = v;
            });
        }
    });
    let count = 0;
    passports.forEach(p => {
        if(p.hasOwnProperty('byr') && p.hasOwnProperty('iyr') && p.hasOwnProperty('eyr') && p.hasOwnProperty('hgt') && p.hasOwnProperty('hcl') && p.hasOwnProperty('ecl') && p.hasOwnProperty('pid')){
            count++;
        }
    });
    console.log(count);
});