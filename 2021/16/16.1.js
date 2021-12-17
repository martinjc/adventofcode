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

let packet = data.split('').map(c => convertChar(c)).join('');
console.log(packet);
console.log(packet.length);

let versions = [];

function consumeHeader() {
    version = convertBits(packet.slice(0, 3));
    packet = packet.substring(3);
    console.log('version', version);
    versions.push(version);
    type = convertBits(packet.slice(0, 3));
    packet = packet.substring(3);
    console.log('type', type);
    return { version: version, type: type }
}

function consumeLiteral() {
    let num = '';
    let more = true;
    let literalSize = 0;
    while(more) {
        let chunk = packet.slice(0, 5);
        console.log('chunk', chunk);
        num += chunk.slice(1);
        packet = packet.substring(5);
        literalSize += 5;
        if (chunk.startsWith(0)) {
            more = false;
        }
    }
    return { val: convertBits(num), size: literalSize };
}

function consumePacket() {
    if (packet.split('').every(a => a === '0')) {
        return undefined;
    }
    let header = consumeHeader();
    if (header.type === 4) {
        let literal = consumeLiteral();
        console.log('literal value', literal);
        return {header: header, value: literal, size: literal.size};
    } else {
        let length = packet[0];
        console.log('length', length);
        packet = packet.substring(1);
        let subPs = [];
        if (length === '0') {
            subPacketLength = packet.slice(0, 15);
            console.log('subPacketLength', subPacketLength);
            packet = packet.substring(15);
            subPacketLengthNum = convertBits(subPacketLength);
            console.log('subPacketLengthNum', subPacketLengthNum);
            let subPackets = true;
            let consumed = 0;
            while (subPackets) {
                let p = consumePacket();
                if (p) {
                    subPs.push(p);
                    consumed += (p.size + 6);
                    console.log('consumed', consumed)
                    if (consumed >= subPacketLengthNum) {
                        subPackets = false;
                    }
                } else {
                    return undefined;
                }

            }
        } else if (length === '1') {
            subPacketNumber = convertBits(packet.slice(0, 11));
            packet = packet.substring(11);
            for (let i = 0; i < subPacketNumber; i++) {
                let p = consumePacket();
                if (p) {
                    subPs.push(p);
                } else {
                    return undefined;
                }

            }
        }
        if (subPs.length > 0) {
            return {
                header: header, value: subPs, size: subPs.reduce((a, i) => a + i.size)
            };
        }
    }
}

let p = consumePacket(packet);
console.log(versions);
console.log(versions.reduce((a, i) => a + i));
