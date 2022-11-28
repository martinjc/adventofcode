input = 'vzbxxyzz';

alphabet = 'abcdefghjkmnpqrstuvwxyz';

function incrementPassword(password) {
    var passwordArray = password.split('');
    var passwordLength = passwordArray.length;
    var i = passwordLength - 1;

    while (i >= 0) {
        var index = alphabet.indexOf(passwordArray[i]);
        if (index < alphabet.length - 1) {
            passwordArray[i] = alphabet[index + 1];
            break;
        } else {
            passwordArray[i] = alphabet[0];
            i--;
        }
    }

    return passwordArray.join('');
}

function isValidPassword(password) {

    let passwordArray = password.split('');
    let passwordLength = passwordArray.length;
    return hasStraight(password) && !hasForbiddenLetters(password) && hasPairs(password);

}

function hasStraight(password) {
    let passwordArray = password.split('');
    let passwordLength = passwordArray.length;

    for (let i = 0; i < passwordLength - 2; i++) {
        let j = alphabet.indexOf(passwordArray[i]);
        if(j < alphabet.length - 2) {
            if (passwordArray[i + 1] === alphabet[j + 1] && passwordArray[i + 2] === alphabet[j + 2]) {
                return true;
            }
        }
    }
    return false;
}

function hasForbiddenLetters(password) {
    let passwordArray = password.split('');
    let passwordLength = passwordArray.length;

    return passwordArray.includes('i') || passwordArray.includes('o') || passwordArray.includes('l');
}

function hasPairs(password) {
    let passwordArray = password.split('');
    let passwordLength = passwordArray.length;

    let count = 0;
    let i = 0;
    while (i < passwordLength) {
        if (passwordArray[i] === passwordArray[i + 1]) {
            count++;
            i += 2;
        } else {
            i++;
        }
    }

    return count > 1;

}

input = incrementPassword(input);
while (!isValidPassword(input)) {
    input = incrementPassword(input);
}
console.log(input);
