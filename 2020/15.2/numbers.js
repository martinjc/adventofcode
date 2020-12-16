
let starting_numbers = [5,2,8,16,18,0,1];

let memory = {};

for(let i = 0; i < starting_numbers.length; i++) {
    memory[starting_numbers[i]] = [i+1];
}

let last_number = starting_numbers[starting_numbers.length-1];

let add_turn = function(memory, spoken, turn) {
    if(memory[spoken] && memory[spoken].length >= 2) {
        memory[spoken].shift();
        memory[spoken].push(turn);
    } else if(memory[spoken] && memory[spoken].length < 2) {
        memory[spoken].push(turn);
    } else {
        memory[spoken] = [turn];
    }
}

for(let i = starting_numbers.length; i < 30000000; i++) {
    if(i % 100000 === 0) {
        console.log(i);
    }
    if(memory[last_number]) {
        if(memory[last_number].length === 1) {
            let speak = 0;
            last_number = speak;
            add_turn(memory, speak, i+1);
        } else {
            let number_spoken = memory[last_number].length;
            let speak = memory[last_number][number_spoken-1] - memory[last_number][number_spoken-2];
            last_number = speak;
            add_turn(memory, speak, i+1)
        }
    }
    //console.log(memory);
}
console.log(last_number);
