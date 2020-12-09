const fs = require('fs');

let testInput = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;

let wires = {};


let isAllValues = function(wires) {
    return Object.keys(wires).every(a => {
        if(typeof wires[a][0] === 'string') {
            return false;
        } else {
            return true;
        }
    });
};

let isNumeric = function(num) {
    return !isNaN(num);
};

let checkValue = function(wires, name) {
    if(wires.hasOwnProperty(name) && wires[name].length === 1 && isNumeric(wires[name])) {
        return +wires[name];
    } else {
        return name;
    }
}

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    //lines = testInput.split(/\r?\n/);

    lines.forEach(l => {
        let parts = l.split(' -> ');
        wires[parts[parts.length-1]] = parts[0].split(' '); 
    });
    while(!isAllValues(wires)) {
        Object.keys(wires).forEach(w => {
            if(wires.hasOwnProperty(w)) {
                if(wires[w].length === 1 && isNumeric(wires[w][0])) {
                    wires[w] = [+wires[w][0]];
                } else if(wires[w].length === 1 && !isNumeric(wires[w][0])) {
                    wires[w] = [checkValue(wires, wires[w][0])];
                } else {
                    wires[w].forEach((c, i) => {
                        if(wires.hasOwnProperty(c)) {
                            wires[w][i] = checkValue(wires, c);
                        }
                    });
                }
                if(wires[w].includes('AND') && isNumeric(wires[w][0]) && isNumeric(wires[w][2])) {
                    wires[w] = [wires[w][0] & wires[w][2]];
                } else if(wires[w].includes('OR') && isNumeric(wires[w][0]) && isNumeric(wires[w][2])) {
                    wires[w] = [wires[w][0] | wires[w][2]];
                } else if(wires[w].includes('NOT') && isNumeric(wires[w][1])) {
                    wires[w] = [~wires[w][1] & 0xFFFF];
                } else if(wires[w].includes('LSHIFT') && isNumeric(wires[w][0]) && isNumeric(wires[w][2])) {
                    wires[w] = [wires[w][0] << +wires[w][2]];
                } else if(wires[w].includes('RSHIFT') && isNumeric(wires[w][0]) && isNumeric(wires[w][2])) {
                    wires[w] = [wires[w][0] >> +wires[w][2]];
                }
            }
        });
    }
    console.log(wires['a']);
});