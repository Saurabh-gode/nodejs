const net = require("net");
const fs = require("fs/promises");

let fileHandle, fileStream;

const server = net.createServer(() => {});
server.on("connection", async (socket) => {
  socket.on("data", async (data) => {
    if (!fileHandle) {
      socket.pause();
      fileHandle = await fs.open(`storage/test.txt`, "w");

      fileStream = fileHandle.createWriteStream();
      socket.resume();
      fileStream.write(data);
    } else {
      if (!fileStream.write(data)) {
        socket.pause();
      }
    }

    fileStream.on("drain", () => {
      console.log("draining");
      socket.resume();
    });
  });
  socket.on("end", () => {
    console.log("connection ended");
    fileHandle.close();
    fileHandle = undefined;
    fileStream = undefined;
    socket.end();
  });
});

server.listen(5050, "::1", () => {
  console.log("uploader server opened on ", server.address());
});
