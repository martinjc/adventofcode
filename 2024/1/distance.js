let fs = require('fs');

let left = [];
let right = [];
let distance = 0;

let input = fs.readFileSync('input', 'utf8').split('\n');
for (line of input) {
    left.push(+line.split('   ')[0]);
    right.push(+line.split('   ')[1]);            
}

//console.log(left, right);

while(left.length > 0) {
    let lmin = Math.min(...left);
    let rmin = Math.min(...right);
    if(rmin > lmin) {
        distance += rmin - lmin;
    } else {
        distance += lmin - rmin;
    }
    left.splice(left.indexOf(lmin), 1);
    right.splice(right.indexOf(rmin), 1);
}

console.log(distance);