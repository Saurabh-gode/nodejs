const net = require("node:net");

const socket = net.createConnection({ host: "localhost", port: 8050 }, () => {
  const reqHead = Buffer.from(
    "474554202f20485454502f312e310d0a636f6e74656e742d6c656e6774683a2034340d0a6163636570742d656e636f64696e673a20677a69702c206465666c6174652c2062720d0a4163636570743a202a2f2a0d0a557365722d4167656e743a205468756e64657220436c69656e74202868747470733a2f2f7777772e7468756e646572636c69656e742e636f6d290d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a20636c6f73650d0a0d0a",
    "hex"
  );

  const reqBody = Buffer.from(
    "7b0a2020226d657373616765223a20227468697320697320746865206c617374206d65737361676521220a7d",
    "hex"
  );

  socket.write(Buffer.concat([reqHead, reqBody]));
});

socket.on("data", (chunk) => {
  console.log("Received Response");
  console.log(chunk.toString("utf-8"));
});

socket.on("end", () => {
  console.log("connection closed");
});
