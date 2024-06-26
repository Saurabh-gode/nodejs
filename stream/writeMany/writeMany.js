const fs = require("node:fs/promises");
const CustomWritable = require("../custom-writable/customWritable");

(async () => {
  console.time("stream_benchmark");
  const filehandle = await fs.open("text.txt", "w");

  const stream = await filehandle.createWriteStream();

  // const stream = new CustomWritable({
  //   highWaterMark: 1800,
  //   filename: "text.txt",
  // }); // custom implementation

  // 8 bits = 1 byte
  // 1000 bytes = 1 kilobyte
  // 1000 kilobytes = 1 megabyte

  // 1a => 0001 1010

  let i = 0;

  const writeMany = () => {
    while (i <= 99999999999) {
      const bufr = Buffer.from(` ${i} `, "utf-8");

      // handle last chunk of data
      if (i === 99999999999) {
        return stream.end(bufr);
      }

      // if stream.write returns false, stop the loop
      // it returns false when the internal stream buffer of 16kb is full
      if (!stream.write(bufr)) {
        break;
      }
      i++;
    }
  };

  writeMany();

  stream.on("drain", () => {
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("stream_benchmark");
    filehandle.close();
  });
})();
