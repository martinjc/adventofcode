const { strictEqual } = require("assert");

let input = '1113122113';

function convertStack(stack) {
    let str = '';
    str += stack.length + stack[0];
    return str;
}

for (let n = 0; n < 50; n++) {
    let str = '';
    let stack = [input[0]];
    for (let i = 1; i < input.length; i++) {
        let currentChar = input[i];
        if (stack[stack.length - 1] === currentChar) {
            stack.push(currentChar);
        } else {
            str += convertStack(stack);
            stack = [currentChar];
        }
    }
    if (stack.length > 0) {
        str += convertStack(stack);
    }

    input = str;
    //console.log(input);
}


console.log(input.length);