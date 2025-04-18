const fs = require("fs");

const key = fs.readFileSync("./key");

function decrypt(cipherText)
{
    const plainText = Buffer.alloc(cipherText.length)

    for (let i = 0; i < plainText.length; i++) {
        // XOR the cipher text with the key
        plainText[i] = cipherText[i] ^ key[i];
        key[i] = 0;
    }

    return plainText;

}
const msg1 = Buffer.from(("d6 de af bc 38 62 48 ea 64 f4 f2 7b 17 a2 ac 7c 43 a0 20").replaceAll(" ", ""), "hex");
const msg1Decrypted = decrypt(msg1);
console.log('msg Decrypted', msg1Decrypted.toString())
