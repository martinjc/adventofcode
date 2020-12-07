const fs = require('fs');

fs.readFile('input', 'utf-8', (err, data) => {
    console.log(err);
    lines = data.split(/\r?\n/);
    slopes = [{"right": 1, "down": 1},{"right": 3, "down": 1},{"right": 5, "down": 1},{"right": 7, "down": 1},{"right": 1, "down": 2},]
    
    let total = 1;

    slopes.forEach(s => {
        let slopeRight = s.right;
        let slopeDown = s.down;
        
        let position = 0;
        let count = 0;

        for(let i = 0; i < lines.length; i += slopeDown) {
            let line = lines[i];
            if(position >= line.length) {
                position -= line.length;
            }
            if(line[position] === '#') {
                count++;
            }
            position += slopeRight;
        }

        total *= count;

    });


    console.log(total);
});