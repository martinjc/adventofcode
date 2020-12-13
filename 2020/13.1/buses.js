const fs = require('fs');
const { syncBuiltinESMExports } = require('module');

const input  = `939
7,13,x,x,59,x,31,19`;

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    //lines = input.split(/\r?\n/);

    let minutes = +lines[0];
    let buses = lines[1].split(',');
    buses = buses.filter(b => {
        return b !== 'x';
    });
    console.log(buses);
    for(let i = minutes; i < minutes + 20; i++) {
        let good_buses = buses.filter(b => {
            if(i % b === 0) {
                return b;
            }
        });
        if(good_buses.length > 0) {
            let wait_time = i - minutes;
            console.log(wait_time * good_buses[0]);
            break;
        }

    }
});

