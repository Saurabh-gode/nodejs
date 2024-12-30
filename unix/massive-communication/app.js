const { spawn } = require("node:child_process");
const fs = require("fs");

// // run c application
// const numberFormatter = spawn("number_formatter", ["./dest.txt", "$", ","]);

// run js application
const numberFormatter = spawn("node", ["number_formatter.js", "./dest.txt", "$", ","]);

numberFormatter.on("data", (data) =>
{
    console.log(data, "DD")
})

numberFormatter.on("close", (code) =>
{
    if (code === 0) {
        console.log(`the file was read, processed successfully.`);
    } else {
        console.log(`something bad happened.`);
    }
});


const fileStream = fs.createReadStream("./src.txt");
fileStream.pipe(numberFormatter.stdin);

// numberFormatter.stdin.write("1234 456 789 10")
// numberFormatter.stdin.write("12 34 45 6 78 9 10")
// numberFormatter.stdin.end("1 2 3 4 4 5 6 7 8 9 10")
