const fs = require("fs");

const key = fs.readFileSync("./key");

function encrypt(plainText)
{
    const cipherText = Buffer.alloc(plainText.length)

    for (let i = 0; i < plainText.length; i++) {
        // XOR the plain text with the key
        cipherText[i] = plainText[i] ^ key[i];
        key[i] = 0;
    }

    return cipherText;

}

const msg1 = Buffer.from("Rush B. roger that!");

const msg1Encrypted = encrypt(msg1);

console.log('msg Encrypted', msg1Encrypted)