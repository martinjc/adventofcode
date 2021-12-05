const { readInputSync } = require("../../lib/utils");

const data = readInputSync('input');

function getMostCommonAtPosition(data, pos) {
    let oneCount = 0;
    let zeroCount = 0;

    data.forEach(r => {
        if (r[pos] === '1') {
            oneCount++;
        } else {
            zeroCount++;
        }
    });

    return [oneCount, zeroCount];
}

let oxygen = '';
let co2 = '';

let oxygen_remaining = data;
let co2_remaining = data;

for (let i = 0; i < data[0].length; i++) {
    let oxygenOneZeroCounts = getMostCommonAtPosition(oxygen_remaining, i);
    oxygenOneCount = oxygenOneZeroCounts[0];
    oxygenZeroCount = oxygenOneZeroCounts[1];

    let co2OneZeroCounts = getMostCommonAtPosition(co2_remaining, i);
    co2OneCount = co2OneZeroCounts[0];
    co2ZeroCount = co2OneZeroCounts[1];

    if (oxygenOneCount >= oxygenZeroCount) {
        oxygen_remaining = oxygen_remaining.filter(d => {
            return d[i] === '1';
        });
        if (oxygen_remaining.length === 1) {
            oxygen = oxygen_remaining[0];
            continue;
        }
    } else {
        oxygen_remaining = oxygen_remaining.filter(d => {
            return d[i] === '0';
        });
        if (oxygen_remaining.length === 1) {
            oxygen = oxygen_remaining[0];
            continue;
        }
    }


    if (co2OneCount < co2ZeroCount) {
        co2_remaining = co2_remaining.filter(d => {
            return d[i] === '1';
        });
        if (co2_remaining.length === 1) {
            co2 = co2_remaining[0];
            continue;
        }
    } else {
        co2_remaining = co2_remaining.filter(d => {
            return d[i] === '0';
        });
        if (co2_remaining.length === 1) {
            co2 = co2_remaining[0];
            continue;
        }
    }
}

console.log(oxygen);
console.log(co2);

oxygen_output = parseInt(oxygen, 2);
co2_output = parseInt(co2, 2);
console.log(oxygen_output, co2_output, (+oxygen_output * +co2_output))