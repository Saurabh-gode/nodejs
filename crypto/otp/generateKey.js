const crypto = require("crypto");
const fs = require("fs");

const key = crypto.randomBytes(100); //

// console.log(key)

fs.writeFileSync("./key", key)
