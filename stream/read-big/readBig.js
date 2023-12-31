const fs = require("node:fs/promises");

(async () => {
  console.time("benchmark");
  const filehandleForRead = await fs.open("../writeMany/text.txt", "r");

  const fileHandleForWrite = await fs.open("writeBig.txt", "w");

  // init a readable stream
  // default highWaterMarkValue is 64KB
  const readableStream = await filehandleForRead.createReadStream({
    highWaterMark: 64 * 1024, // 64 KBs
  });

  const writableStream = await fileHandleForWrite.createWriteStream();

  // add eventListeners to the read stream
  // unless a eventListener "data" is added, this readable stream will be in "PAUSED" state.

  // when this listener is added, stream starts to emit data chunks into this listener.
  // and the stream would be said to be in the "flowing" state because of this listener".

  readableStream.on("data", (chunk) => {
    // remember the default internal buffer size is 16KBs
    // and we are reading 64KB from the readablestream.
    // nodejs buffers this extra data thus affecting in higher memory usage.

    // handling memory usage with eventhandlers
    if (!writableStream.write(chunk)) {
      // pause the stream until the data is drained from the writable stream.
      readableStream.pause();
    }
  });

  writableStream.on("drain", () => {
    // resume the readable stream to read more data.
    readableStream.resume();
  });

  //
  console.timeEnd("benchmark");
})();
