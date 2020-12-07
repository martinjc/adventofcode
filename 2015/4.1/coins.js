const crypto = require('crypto');

const input = 'ckczppom';

let hash = '';
let number = 0;
while(!hash.startsWith('00000')) {
    number++;
    hash = crypto.createHash('md5').update(input + number).digest('hex');
}
console.log(number);
