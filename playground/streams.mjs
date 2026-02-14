import fs from "node:fs/promises";

(async () =>
{
    const readFileId = await fs.open("./textGigantic.txt", "r");
    const writeFileId = await fs.open("./textGigantic2.txt", "w");

    const streamRead = readFileId.createReadStream({ highWaterMark: 64 * 1024 });

    const streamWrite = writeFileId.createWriteStream();

    streamRead.on("data", (chunk) =>
    {
        if (!streamWrite.write(chunk)) {
            streamRead.pause();
        }
    })


    streamWrite.on("drain", () =>
    {
        streamRead.resume();
    })


})();

