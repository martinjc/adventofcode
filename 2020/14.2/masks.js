const fs = require('fs');


const input = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

let mask = '';
let memory = {};

let address_re = /\[(\d+)\]/;
let value_re = /\s=\s(\d+)/;
let floating_re = /(X)/g;

let combs = function(num) {
    let combinations = [];
    for(let j = 0; j < num; j++) {
        combinations.push([]);
        let current = '0';
        let count = 0;
        for(let i = 0; i < Math.pow(2, num); i++) {
            if(count === (Math.pow(2, j))) {
                if(current === '0') {
                    current = '1';
                } else {
                    current = '0';
                }
                count = 0;
            }
            combinations[j].push(current);
            count++
        }
    }
    return combinations;
}


fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    //lines = input.split(/\r?\n/);

    lines.forEach(l => {
        if (l.startsWith('mask')) {
            mask = l.split(' = ')[1];
        } else {
            let matches = l.match(address_re);
            let address = matches[1];
            let value = l.match(value_re)[1];
            address = (address >>> 0).toString(2).padStart(mask.length, '0');
            let countX = mask.match(floating_re).length;
            let new_address = '';
            for(let i = 0; i < mask.length; i++) {
                if(mask[i] === 'X') {
                    new_address += 'X';
                } else if(mask[i] === '1') {
                    new_address += '1';
                } else if(mask[i] === '0') {
                    new_address += address[i];
                } 
            }
            let combinations = combs(countX);
            let addresses = [];
            for(let i = 0; i < Math.pow(2, countX); i++) {
                addresses.push(new_address);
            }
            for(let i = 0; i < countX; i++) {
                for(let j = 0; j < addresses.length; j++) {
                    addresses[j] = addresses[j].replace('X', combinations[i][j]);
                }
            }
            addresses.forEach(a => {
                memory[a] = +value;
            })
        }

    });

    let sum = Object.values(memory).reduce((acc, a) => { return acc + a; }, 0);
    console.log(sum);
});