const { Writable } = require("node:stream");
const fs = require("node:fs");
module.exports = class CustomWritable extends Writable {
  constructor({ highWaterMark, filename }) {
    super({ highWaterMark });
    this.filename = filename;
    this.fd = null;
    this.writesCount = 0;
    this.chunks = [];
    this.chunkSize = 0;
  }

  _construct(callbackfn) {
    fs.open(this.filename, "w", (err, fd) => {
      if (err) {
        return callbackfn(err);
      } else {
        this.fd = fd;
        callbackfn();
      }
    });
  }

  _write(chunk, encoding, callbackfn) {
    this.chunks.push(chunk);
    this.chunkSize += chunk.length;

    if (this.chunkSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) return callbackfn(err);

        this.chunks = [];
        this.chunkSize = 0;
        this.writesCount++;
        callbackfn();
      });
    } else {
      callbackfn();
    }
  }

  _final(callbackfn) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callbackfn(err);

      this.chunks = [];
      callbackfn();
    });
  }

  _destroy(err, callbackfn) {
    console.log("Write Count:", this.writesCount);
    if (this.fd) {
      fs.close(this.fd, (er) => callbackfn(er || err));
    } else {
      callbackfn(err);
    }
  }
};
