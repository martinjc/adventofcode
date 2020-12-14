const fs = require('fs');

const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

let mask = '';
let memory = {};

let address_re = /\[(\d+)\]/;
let value_re = /\s=\s(\d+)/;


fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    //lines = input.split(/\r?\n/);

    lines.forEach(l => {
        if (l.startsWith('mask')) {
            mask = l.split(' = ')[1];
        } else {
            let matches = l.match(address_re);
            let address = matches[1];
            let values = l.match(value_re);
            let value = (values[1] >>> 0).toString(2).padStart(mask.length, '0');
            let newstr = '';
            for(let i = 0; i < mask.length; i++) {
                if(mask[i] === 'X') {
                    newstr += value[i];
                } else if(mask[i] === '1') {
                    newstr += '1';
                } else if(mask[i] === '0') {
                    newstr += '0';
                }
            }
            memory[address] = +(parseInt(newstr, 2).toString(10));
        }

    });
    let sum = Object.values(memory).reduce((acc, a) => { return acc + a; }, 0);
    console.log(sum);
});