const fs = require('fs');

fs.readFile('input', 'utf-8', ((err, data) => {
    passwords = data.split(/\r?\n/);

    let count = 0;

    passwords.forEach(p => {
        
        tokens = p.split(' ');

        let high_low = tokens[0].split('-');
        let tokens_low = +high_low[0];
        let tokens_high = +high_low[1];

        console.log(tokens_low, tokens_high);

        let character = tokens[1][0];

        console.log(character);

        let password = tokens[2];
        console.log(password);

        let character_count = 0;
        for(let i = 0; i < password.length; i++) {
            if(character === password[i]) {
                character_count++;
            }
        }
        console.log(character_count);
        if(character_count >= tokens_low && character_count <= tokens_high) {
            count++;
        }
    })
    console.log(count);
}))