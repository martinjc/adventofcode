const fs = require('fs');
const { syncBuiltinESMExports } = require('module');

const input1  = `7,13,x,x,59,x,31,19`;
const input2 = `17,x,13,19`;
const input3 = `67,7,59,61`;
const input4 = `67,x,7,59,61`;

fs.readFile('input', 'utf-8', (err, data) => {


    let input = data.split(',');
    //input = input2.split(',');
    buses = []
    input.forEach((b, i) => {
        if(b !== 'x') {
            buses.push({id: +b, delta: i});
        }
    });

    let checkBuses = function(t, buses) {
        return buses.every(b => {
            return (t+b.delta) % b.id === 0;
        })
    }

    console.log(buses);
    let t = 100000000000000;
    let next = 1;
    buses.forEach((b, i) => {
        let found = false;
        while(!found) {
            if(checkBuses(t, buses.slice(0, i+1))){
                console.log(`t: ${t}, buses: ${i+1}`);
                found = true;
                buses.slice(0, i+1).forEach((b3 => {
                    console.log(b3.id, ((t+b3.delta) % b3.id));
                }))
                next = buses.slice(0, i+1).reduce((acc, b2) => {
                    return acc * b2.id; 
                }, 1);
                console.log(next);
            }
            t += next;
        }
        
    });
});

