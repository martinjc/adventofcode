const fs = require('fs');

let contents_re = /\"(.*)\"/g

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    let code = 0;
    let characters = 0;
    lines.forEach((l) => {
        code += l.length;
        let escaped = decodeURIComponent(l);
        escaped = l;
        escaped = escaped.split(/\\x[0-9a-f]{2}/).join('a');
        escaped = escaped.split(/\\"/).join("a");
        escaped = escaped.split(/\\\\/).join("a");
        characters += escaped.length-2;
    });
    
    console.log(code - characters);

})