const fs = require('fs');

fs.readFile('input', 'utf-8', (err, data) => {
    let floor = 0;
    for(let i = 0; i < data.length; i++) {
        if(data[i] === '(') {
            floor++;
        } else if (data[i] === ')') {
            floor--;
        }
        if(floor === -1) {
            console.log(i+1);
            break;
        }
    }
    console.log(floor);
});