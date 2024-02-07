const dgram = require("dgram");

const receiver = dgram.createSocket("udp4");

receiver.on("message", (message, remoteInfo) => {
  console.log(message.toString("utf-8"), "| INFO |", remoteInfo);
});

receiver.bind({ address: "127.0.0.1", port: 8000 });

receiver.on("listening", () => {
  console.log(receiver.address());
});
