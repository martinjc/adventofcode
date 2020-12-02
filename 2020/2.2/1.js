const fs = require('fs');

fs.readFile('input', 'utf-8', ((err, data) => {
    passwords = data.split(/\r?\n/);

    let count = 0;

    passwords.forEach(p => {
        
        tokens = p.split(' ');

        let positions = tokens[0].split('-');
        let first_position = +positions[0]-1;
        let second_position = +positions[1]-1;

        console.log(first_position, second_position);

        let character = tokens[1][0];

        console.log(character);

        let password = tokens[2];
        console.log(password);

        if(password[first_position] === character && password[second_position] !== character ||password[first_position] !== character && password[second_position] === character) {
            count++;
        }
    })
    console.log(count);
}))