const { stdin, stdout, stderr, argv, exit } = require('node:process');
const fs = require("node:fs");

// first argument and output the file path 
const filepath = argv[2];

if (filepath) {
    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(stdout);
    fileStream.on("end", () => {
        stdout.write("\n")
        exit(0);
    })
}

stdin.on("data", (data) => {
    console.log("data", process.argv);

    stdout.write(data.toString("utf-8"))
})
