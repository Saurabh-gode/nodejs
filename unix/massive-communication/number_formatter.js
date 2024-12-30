const fs = require("node:fs");
const { argv } = require("node:process");

function formatNumber(input, begin, divider)
{
    const length = input.length;

    let formattedNumber = "";
    let j = 0; // index for the formatted string
    let commaCount = length % 3; // determine where the first divider should be placed

    // Add begin sign at the beginning
    formattedNumber = begin;
    j = j + 1;

    // Iterate over the original string from the beginning
    for (let i = 0; i < length; i++) {
        formattedNumber += input[i];
        j = j + 1;

        // Add a divider every three digits, but not after the last digit
        if (commaCount > 0 && i < length - 1 && (i + 1) % 3 == commaCount) {
            formattedNumber += divider;
        } else if (commaCount == 0 && i < length - 1 && (i + 1) % 3 == 0) {
            formattedNumber += divider;
        }
    }

    return formattedNumber;
}


const writeStream = fs.createWriteStream(process.argv[2]);

let number = "";
let index = 0;

process.stdin.on("data", (data) =>
{
    // parse buffer to utf-8 string.
    const dataStr = data.toString("utf-8");

    for (let char of dataStr) {

        if (char != " ") {
            number += char;
            index++;

        }

        if (char === " ") {
            if (index > 0) {
                // just format the number
                let formattedNumber = formatNumber(number, argv[3][0], argv[4][0]);

                // write to our destination stream
                if (!writeStream.write(" " + formattedNumber + " ")) {
                    // pause if untill buffer is flushed to disk.
                    process.stdin.pause();
                }

                // Resetting...
                number = "";
                index = 0;
            }

        }
    }


})


writeStream.on("drain", () =>
{
    // resume once draining is complete.
    process.stdin.resume();
});

process.stdin.on("end", () =>
{
    // end the streaming. to flush remaining buffer.
    writeStream.end();
});
