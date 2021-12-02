const fs = require('fs/promises');

async function readInput(input) {
    // open the input file with the input data
    const data = await fs.readFile(input, 'utf-8')
    rows = data.split(/\r?\n/);
    return rows;
}

module.exports = {
    readInput: readInput,
}