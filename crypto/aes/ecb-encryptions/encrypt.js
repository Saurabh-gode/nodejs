const crypto = require("crypto");

const key = Buffer.from("0123456789abcdef");

const plaintext = Buffer.from("2", "utf-8");

const cipher = crypto.createCipheriv("aes-128-ecb", key, null);

const cipherChunk1 = cipher.update(plaintext);
const cipherChunk2 = cipher.final();

const ciphertext = Buffer.concat([cipherChunk1, cipherChunk2]);

console.log("ciphertext", ciphertext);
console.log("ciphertext hex", ciphertext.toString("hex"));
