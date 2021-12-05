const { readInputSync } = require("../../lib/utils");


const data = readInputSync('input');

oneCount = new Array(data[0].length).fill(0);
zeroCount = new Array(data[0].length).fill(0);

data.forEach(r => {
    [...r].forEach((c, i) => {
        if (c === '0') {
            zeroCount[i]++;
        } else if (c === '1') {
            oneCount[i]++;
        }
    })
});

let gamma_output = '';
let epsilon_output = '';

for (let i = 0; i < zeroCount.length; i++) {
    if (oneCount[i] > zeroCount[i]) {
        gamma_output += '1';
        epsilon_output += '0'
    } else {
        gamma_output += '0';
        epsilon_output += '1';
    }
}

gamma_output = parseInt(gamma_output, 2);
epsilon_output = parseInt(epsilon_output, 2);
console.log(gamma_output, epsilon_output, (+gamma_output * +epsilon_output));