const CustomWritable = require("./customWritable");

const stream = new CustomWritable({
  highWaterMark: 1800,
  filename: "text.txt",
});

for (let i = 0; i < 10000000000; i++) {
  stream.write(Buffer.from("saurabh"));
}
stream.end(Buffer.from("done"));

stream.on("finish", () => {
  console.log("done writing with custom writable");
});
