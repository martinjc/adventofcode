const fs = require('fs');

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);

    let count1 = 0;
    let count3 = 0;
    let adaptors = [];
    lines.forEach(l => {
        adaptors.push(+l);
    });
    adaptors.sort((a, b) => a-b);
    console.log(adaptors);
    adaptors.forEach((a, i) => {
        let diff = 0;
        if(i > 0) {
            diff = a - adaptors[i-1];
        } else {
            diff = a;
        }
        if(diff === 3) {
            count3++
        } else if (diff === 1) {
            count1++
        } else {
            console.log(`damn`);
        }
    });
    count3++;
    console.log(count1, count3);
    console.log(count1 * count3);
});