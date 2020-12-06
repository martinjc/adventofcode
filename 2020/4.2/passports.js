const fs = require('fs');

const yearRegex = /\d{4}/;
const heightRegex = /\d+(cm|in)/;
const hairRegex = /#(\d|[a-f]){6}/;
const pidRegex = /\d{9}/


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

    let checkBYR = function(str) {
        return yearRegex.test(str) && +str>= 1920 && +str <= 2002;
    }

    let checkIYR = function(str) {
        return yearRegex.test(str) && +str>= 2010 && +str <= 2020;
    }

    let checkEYR = function(str) {
        return yearRegex.test(str) && +str >= 2020 && +str <= 2030;
    }

    let checkHGT = function(str) {
        if(heightRegex.test(str)) {
            if(str.includes('cm')) {
                str = str.replace('cm', '');
                return +str >= 150 && +str <= 193;
            } else if(str.includes('in')) {
                str = str.replace('in', '');
                return +str >= 59 & +str <= 76;
            }
        }
    }

    let checkHCL = function(str) {
        return hairRegex.test(str);
    }

    let checkECL = function(str) {
        return str === 'amb' || str === 'blu' || str === 'brn' || str === 'gry' || str === 'hzl' || str === 'grn' || str === 'oth'; 
    }

    let checkPID = function(str) {
        return pidRegex.test(str) && str.length === 9;
    }

    validpassports = [];

    let count = 0;
    passports.forEach(p => {
        if(p.hasOwnProperty('byr') && p.hasOwnProperty('iyr') && p.hasOwnProperty('eyr') && p.hasOwnProperty('hgt') && p.hasOwnProperty('hcl') && p.hasOwnProperty('ecl') && p.hasOwnProperty('pid')){
            if(checkBYR(p['byr']) && checkIYR(p['iyr']) && checkEYR(p['eyr']) && checkHGT(p['hgt']) && checkHCL(p['hcl']) && checkECL(p['ecl']) && checkPID(p['pid'])) {
                validpassports.push(p);
                count++;
            }
        }
    });
    console.log(count);
    fs.writeFile('output', JSON.stringify(validpassports), function(err) {
        console.log(err);
    });
});