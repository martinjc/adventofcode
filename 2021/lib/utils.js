const fs = require('fs/promises');
const fssync = require('fs');

async function readInput(input) {
    // open the input file with the input data
    const data = await fs.readFile(input, 'utf-8')
    rows = data.split(/\r?\n/);
    return rows;
}

function readInputSync(input) {
    const data = fssync.readFileSync(input, 'utf-8');
    rows = data.split(/\r?\n/);
    return rows
}

module.exports = {
    readInput: readInput,
    readInputSync: readInputSync
}