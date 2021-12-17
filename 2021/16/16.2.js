const fs = require('fs');
const data = fs.readFileSync('input', 'utf-8');

const hex2bin = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
}

function convertChar(char) {
    return hex2bin[char]
}

function convertBits(bits) {
    return parseInt(bits, 2);
}

class Packet {
    constructor(version, typeId) {
        this.version = version;
        this.typeId = typeId;
        this.packets = [];
    }
}


function parsePackets(input, numSubPackets = -1) {
    const packets = [];
    let totalPackets = 0;
    const inputSize = input.length;
    while (input.length > 0 && (numSubPackets < 0 || totalPackets < numSubPackets)) {
        if (input.split('').every(a => a === '0')) {
            break;
        }
        const version = convertBits(input.substring(0, 3));
        const typeId = convertBits(input.substring(3, 6));
        const packet = new Packet(version, typeId);
        totalPackets++;
        input = input.substring(6);

        if (typeId === 4) {
            let num = '';
            while (input[0] === '1') {
                num += input.substring(1, 5);
                input = input.substring(5);
            }
            num += input.substring(1, 5);
            input = input.substring(5);
            packet.value = convertBits(num);
        } else {
            const lengthType = input[0];
            input = input.substring(1);
            if (lengthType === "0") {
                let length = convertBits(input.substring(0, 15));
                input = input.substring(15);
                let subPackets = input.substring(0, length);
                packet.packets = parsePackets(subPackets);
                input = input.substring(length);
            } else {
                let numSubPackets = convertBits(input.substring(0, 11));
                input = input.substring(11);
                packet.packets = parsePackets(input, numSubPackets);
                input = input.substring(packet.packets.consumed);
                delete packet.packets.consumed;
            }
            if (typeId === 0) {
                packet.value = packet.packets.reduce((a, b) => a + b.value, 0);
                break;
            } else if (typeId === 1) {
                packet.value = packet.packets.reduce((a, b) => a * b.value, 1);
                break;
            } else if (typeId === 2) {
                packet.value = Math.min(...packet.packets.map(a => a.value));
                break;
            } else if (typeId === 3) {
                packet.value = Math.max(...packet.packets.map(a => a.value));
                break;
            } else if (typeId === 5) {
                if (packet.packets[0].value > packet.packets[1].value) {
                    packet.value = 1;
                } else {
                    packet.value = 0;
                }
                break;
            } else if (typeId === 6) {
                if (packet.packets[0].value < packet.packets[1].value) {
                    packet.value = 1;
                } else {
                    packet.value = 0;
                }
                break;
            } else if (typeId === 7) {
                if (packet.packets[0].value == packet.packets[1].value) {
                    packet.value = 1;
                } else {
                    packet.value = 0;
                }
                break;
            }
        }
        packets.push(packet);
    }
    packets.consumed = inputSize - input.length;
    return packets;
}

let input = data.split('').map(c => convertChar(c)).join('');
let packets = parsePackets(input);
console.log(packets);

function sumVersions(ps) {
    return packets
        .map(p => p.version + sumVersions(p.packets))
        .reduce((a, b) => a + b, 0);
}
console.log(sumVersions(packets));
console.log(packets[0].value);