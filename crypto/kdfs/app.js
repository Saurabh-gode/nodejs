const crypto = require("node:crypto");

const password = "my_password"

// we add salt to prevent rainbow table attacks to decrypt any data.
const salt = crypto.randomBytes(32);

const saltIterations = 10000;

// we specify the length of the key that we want to generate.
const keyLength = 32; // 256 bits of data

const digest = "sha256"

crypto.pbkdf2(password, salt, saltIterations, keyLength, digest, (err, derivedKey) =>
{
    if (err) {
        console.log(err);
    }

    console.log("Derived Key:", derivedKey.toString("hex"));
})
