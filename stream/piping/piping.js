const fs = require("node:fs/promises");

// // implementation without streams..
// // something similar to stream..
// (async () => {
//   console.time("copy_benchmark");
//   const readFileSrc = await fs.open("../writeMany/text.txt", "r");
// const writeTofile = await fs.open("copied.txt", "w");

// // we'r gonna read small small chunks and write it to a file
// // by default 16kb of data is read and stored into a buffer.

// let bytesRead = -1;

// while (bytesRead !== 0) {
//   const readResult = await readFileSrc.read();
//   bytesRead = readResult.bytesRead;

//   // check for half empty buffer size
//   if (bytesRead !== 16384) {
//     // get the first index from where the buffer is empty in 16KB readSize buffer
//     const indexOfNotFilled = readResult.buffer.indexOf(0);

//     const newTempBuffer = Buffer.alloc(indexOfNotFilled);

//     // copy half filled buffer data to the new temp buffer
//     readResult.buffer.copy(newTempBuffer, 0, 0, indexOfNotFilled);

//     // now write that bufffer to destination
//     writeTofile.write(newTempBuffer);
//   } else {
//     writeTofile.write(readFileSrc.buffer);
//   }
// }

//   console.timeEnd("copy_benchmark");
// })();

/* -------------------------------------------------------------------------------------- */

const { pipeline } = require("node:stream");

// with streams implementation
(async () => {
  console.time("pipe_benchmark");
  const srcFile = await fs.open("../writeMany/text.txt", "r");
  const destFile = await fs.open("pipedCopy.txt", "w");

  // init streams..
  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // all the things like
  // 1. reading in chunks 2. buffering that data efficiently 16kbs
  // 3. draining the buffer by writing it to destination
  // 4. handling "end" event on readStream and "finish" event on writeStream
  // are handled by this pipe method automatically we dont have to manually do it.

  //   console.log(readStream.readableFlowing);
  //   readStream.pipe(writeStream);

  //   console.log(readStream.readableFlowing);
  //   readStream.unpipe(writeStream);

  //   console.log(readStream.readableFlowing);

  //   readStream.pipe(writeStream);
  //   console.log(readStream.readableFlowing);

  //   readStream.on("end", () => {
  //     console.timeEnd("pipe_benchmark");
  //   });

  // pipe method does not handle closing of the streams..

  // better way to do the same thing with errHandling is "pipeline" Method
  // read about "pump" library on npm
  pipeline(readStream, writeStream, (err) => {
    console.log(err);
  });
  console.timeEnd("pipe_benchmark");
})();
