const net = require("net");
const fs = require("fs/promises");

const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
  const filePath = "./text.txt";
  const fileHandle = await fs.open(filePath, "r");

  //reading from the source file
  const fileStream = fileHandle.createReadStream();

  fileStream.on("data", (data) => {
    if (!socket.write(data)) {
      fileStream.pause();
    }
  });

  socket.on("drain", () => {
    fileStream.resume();
  });

  fileStream.on("end", () => {
    socket.end();
  });
});
