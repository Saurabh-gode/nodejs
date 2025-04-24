const crypto = require("node:crypto")
const fs = require("node:fs")
const { pipeline } = require("node:stream")

const password = process.env.FE_PASSWORD || "nonSecuredPassword"


const fd = fs.openSync("./data.enc", "r");

const algorithm = "aes-256-gcm";

const salt = Buffer.alloc(16)
const iv = Buffer.alloc(12)
const authCode = Buffer.alloc(16)

const fileSize = fs.fstatSync(fd).size;

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

// read first 16 bytes of data. and add to salt.
fs.readSync(fd, salt, 0, 16, 0);

// read 12 bytes from first 16 bytes and add to IV.
fs.readSync(fd, iv, 0, 12, 16);

// read last 16 bytes of the file and add to authCode.
fs.readSync(fd, authCode, 0, 16, fileSize - 16);


// derive the key
crypto.pbkdf2(password, salt, 1_000_000, 32, "sha512", (err, key) =>
{
    if (err) {
        return console.error(err);
    }

    const cipher = crypto.createDecipheriv(algorithm, key, iv);

    // set the MAC for verification.
    cipher.setAuthTag(authCode);

    const input = fs.createReadStream("./data.enc", {
        start: 28, // excluding salt and iv 16+16
        end: fileSize - (16 + 1) // excluding MAC
    })

    const plainText = fs.createWriteStream("./data_encrypted.txt");

    pipeline(input, cipher, plainText, (err) =>
    {
        if (err) {
            return console.error(err)
        }

        console.log("Decryption completed and authentication tag verified.")
    })

})
