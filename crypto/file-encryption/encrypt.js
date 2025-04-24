const fs = require("node:fs");
const crypto = require("node:crypto");
const { pipeline } = require("node:stream");

const password = process.env.FE_PASSWORD || "nonSecuredPassword";

const algorithm = "aes-256-gcm";

// salt for key derivation function.
const salt = crypto.randomBytes(16);

// initial vector
const iv = crypto.randomBytes(12); // recomended to stick with 96 bits. 


console.log('salt', salt)
console.log('iv', iv)

crypto.pbkdf2(password, salt, 1_000_000, 32, "sha512", (err, key) =>
{
    if (err) {
        return console.error(err)
    }

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const plainText = fs.createReadStream("./data.txt");
    const output = fs.createWriteStream("./data.enc"); // salt + iv + cypherText + MAC

    /*
        +--------------------------+
        |      Salt (16 bytes)     |
        +--------------------------+
        |       IV (16 bytes)      |
        +--------------------------+
        |   Output (any size)      |
        +--------------------------+
        |       MAC (16 bytes)     |
        +--------------------------+
    */

    // add salt and iv at the beginning of the encrypted data.
    output.write(salt);
    output.write(iv);

    pipeline(plainText, cipher, output, (err) =>
    {
        if (err) {
            return console.error(err);
        }

        // MAC (Message Authentication Code)
        const authCode = cipher.getAuthTag()

        // add the MAC at the end of the encrypted data.
        fs.appendFileSync("./data.enc", authCode)

        console.log('Encryption completed and authentication tag written.')
    })
})
