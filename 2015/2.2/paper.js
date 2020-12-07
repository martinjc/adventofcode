const fs = require('fs');

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    let total = 0;
    lines.forEach(line => {
        nums = line.split('x');
        let l = +nums[0];
        let w = +nums[1];
        let h = +nums[2];
        let volume = l * w * h;
        let perimeter = Math.min(2 * l + 2 * w, 2 * l + 2 * h, 2 * w + 2 * h);
        let totalLength = volume+perimeter;
        total += totalLength;
    });
    console.log(total);
});