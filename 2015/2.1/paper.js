const fs = require('fs');

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    let total = 0;
    lines.forEach(line => {
        nums = line.split('x');
        let l = +nums[0];
        let w = +nums[1];
        let h = +nums[2];
        let area = 2 * l * w + 2 * w * h + 2 * h * l;
        let extra = Math.min(l * w, l * h, w * h);
        let totalArea = area+extra;
        total += totalArea;
    });
    console.log(total);
});