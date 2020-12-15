const { start } = require("repl");

let starting_numbers = [0,3,6];

let memory = {};

for(let i = 0; i < starting_numbers.length; i++) {
    memory[starting_numbers[i]] = [i+1];
}

let last_number = starting_numbers[starting_numbers.length-1];

for(let i = starting_numbers.length; i < 2020; i++) {
    if(memory[last_number]) {
        if(memory[last_number].length === 1) {
            let speak = 0;
            last_number = speak;
            if(memory[last_number]) {
                memory[speak].push(i+1);
            } else {
                memory[speak] = [i+1]
            }
        } else {
            let number_spoken = memory[last_number].length;
            let speak = memory[last_number][number_spoken-1] - memory[last_number][number_spoken-2];
            if(memory[speak]) {
                memory[speak].push(i+1);
            } else {
                memory[speak] = [i+1];
            }
            last_number = speak;
        }
    }
}
console.log(last_number);
