const utils = require('../../lib/utils.js');

(async () => {
    // read the input file
    let data = await utils.readInput('input');
    // convert to numbers;
    data = data.map(d => {
        return +d;
    });
    data = data.map((d, i, a) => {
        if (i < data.length - 2) {
            return d + a[i + 1] + a[i + 2];
        }
    });
    let counter = data.reduce((previousValue, currentValue, currentIndex, array) => {
        if (currentValue > array[currentIndex - 1]) {
            previousValue++;
        }
        return previousValue;
    }, 0);
    console.log(counter);
})();
