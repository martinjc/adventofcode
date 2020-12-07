const fs = require('fs');

fs.readFile('input', 'utf-8', (err, data) => {
    console.log(err);
    lines = data.split(/\r?\n/);
    let position = 0;
    let count = 0;
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if(position >= line.length) {
            position -= line.length;
        }
        if(line[position] === '#') {
            count++;
        }
        position += 3;
    }
    console.log(count);
});