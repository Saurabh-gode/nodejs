const fs = require("node:fs");
const path = require("node:path");

// "require" use relative path to the currentfile.
require("./file");

// working directory from where the node process is invoked.
// relative paths depend on this process.cwd() fn.
console.log("process cwd: ", process.cwd());

// fs relys on process.cwd() to evaluate relative paths.
// below line produces errors when process is not run from correct directory.
// const content = fs.readFileSync("./text.txt", "utf-8");

// always prefer to use following pattern while working with files modules.
const content2 = fs.readFileSync(path.join(__dirname, "/text.txt"), "utf-8")

console.log(content2 );

