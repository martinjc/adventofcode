const fs = require('fs')

let findNumbersMultiple = (nums, callback) => {

    // look through the array, 
    // for each number n see if (2020-n) is present. 
    // If so, multiply numbers together and that's our answer
    nums.forEach(n => {
        if(nums.includes(2020-n)) {
            callback(n * (2020-n));
        }
    });
};

// open the input file with the input data
fs.readFile('input', 'utf-8', (error, data) => {
    // convert into an array for easier processing, 
    // split on new lines
    nums = data.split(/\r?\n/);
    
    // convert each entry into a number
    nums = nums.map(n => {
        return +n;
    });

    findNumbersMultiple(nums, answer => {
        console.log(answer);
    });
    

});