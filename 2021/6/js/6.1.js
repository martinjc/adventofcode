const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let fish = rows[0].split(',').map(n => +n);
console.log(fish);

for (let day = 1; day <= 80; day++) {
    let num_existing = fish.length;
    for (let i = 0; i < num_existing; i++) {
        if (fish[i] === 0) {
            fish.push(8);
            fish[i] = 6;
        } else {
            fish[i]--;
        }
    }
}

console.log(fish.length);