const fs = require('fs');

let contents_re = /\"(.*)\"/g

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    let code = 0;
    let characters = 0;
    lines.forEach((l) => {
        code += l.length;
        console.log(l);
        let encoded = JSON.stringify(l);
        console.log(encoded);
        characters += encoded.length;
    });
    
    console.log(characters - code);

})