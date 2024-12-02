let fs = require('fs');

let left = [];
let right = [];
let similarity = 0;

let input = fs.readFileSync('input', 'utf8').split('\n');
for (line of input) {
    left.push(+line.split('   ')[0]);
    right.push(+line.split('   ')[1]);            
}

for (l of left) {
    rcount = right.filter(n => n == l).length;
    similarity += (l * rcount);
}

console.log(similarity);