# Node.js TCP Server & Client – net Module Learning Notes

This project is a **low-level learning exercise** to understand how raw TCP communication works in Node.js using the built-in `net` module.

Unlike the `http` module:
- There is **no protocol**
- No headers, no status codes, no routing
- Just **bytes flowing over a socket**

The purpose of this README is to help future-me quickly recall:
- how TCP sockets work in Node
- how streams behave over sockets
- how backpressure is handled manually
- how file uploads can be built from scratch

---

## What This Project Does

This project contains **two programs**:

### 1️⃣ TCP Server (Uploader)
- Listens on port `5050`
- Accepts raw TCP connections
- Receives file data as byte streams
- Writes incoming data to `storage/test.txt`
- Manually handles backpressure

### 2️⃣ TCP Client (Sender)
- Connects to the TCP server
- Reads a local file (`text.txt`)
- Streams file contents to the server
- Respects backpressure from the socket

---

## Why Use the `net` Module?

The `net` module:
- Works at **TCP layer (Layer 4)**
- Is protocol-agnostic
- Gives full control over data flow
- Is the foundation of HTTP, FTP, SMTP, etc.

This code demonstrates **how HTTP-style uploads work internally**, without any abstractions.

---

## Core Concepts Learned

---

## 1. Creating a TCP Server

```js
const net = require("net");
const server = net.createServer();
````

* `net.createServer()` creates a **TCP server**
* It emits a `"connection"` event for every client
* Each connection gives a **socket**

---

## 2. TCP Socket = Duplex Stream

```js
server.on("connection", (socket) => { ... });
```

A socket is:

* **Readable stream** → incoming data from client
* **Writable stream** → outgoing data to client

This means:

* `.on("data")` works
* `.write()` works
* `.pause()` / `.resume()` work
* Backpressure exists on both sides

---

## 3. Receiving Data from Client

```js
socket.on("data", async (data) => {
  ...
});
```

Important mental model:

* TCP does **not preserve message boundaries**
* `"data"` events deliver **arbitrary-sized chunks**
* One file = many chunks
* Chunks arrive as fast as the OS/network allows

---

## 4. Lazy File Initialization (First Chunk)

```js
if (!fileHandle) {
  socket.pause();
  fileHandle = await fs.open("storage/test.txt", "w");
  fileStream = fileHandle.createWriteStream();
  socket.resume();
  fileStream.write(data);
}
```

Why this pattern is used:

* File is opened **only when data arrives**
* Avoids unnecessary resource usage
* Ensures file stream exists before writing

Why `socket.pause()`:

* Prevents more data while async file setup happens
* Protects against memory overflow

---

## 5. Writing Incoming Data to Disk

```js
if (!fileStream.write(data)) {
  socket.pause();
}
```

Key idea:

* `.write()` returns `false` → write buffer is full
* This signals **backpressure**
* Incoming TCP data must be paused manually

Data flow:

```
Client file → socket → server socket → file write stream → disk
```

---

## 6. Backpressure Handling (`drain`)

```js
fileStream.on("drain", () => {
  console.log("draining");
  socket.resume();
});
```

Why this is critical:

* Prevents memory blow-up
* Synchronizes producer (socket) with consumer (file)
* Ensures system stays stable under large transfers

This is **manual backpressure management**, something HTTP frameworks hide.

---

## 7. Connection End Handling

```js
socket.on("end", () => {
  console.log("connection ended");
  fileHandle.close();
  fileHandle = undefined;
  fileStream = undefined;
  socket.end();
});
```

What `end` means:

* Client has finished sending data
* No more bytes will arrive
* Safe to close file & clean up resources

Always clean up:

* File descriptors
* Streams
* Socket state

---

## TCP Client Breakdown

---

## 8. Creating a TCP Client

```js
const socket = net.createConnection({ host: "::1", port: 5050 });
```

* Establishes a raw TCP connection
* No HTTP handshake
* No request/response model
* Just a persistent byte pipe

---

## 9. Streaming File to Server

```js
const fileStream = fileHandle.createReadStream();
```

* File is read in chunks
* Data flows as fast as possible
* Stream respects OS-level buffering

---

## 10. Writing to Socket with Backpressure

```js
fileStream.on("data", (data) => {
  if (!socket.write(data)) {
    fileStream.pause();
  }
});
```

Meaning:

* Socket write buffer may fill
* If full → pause reading from file
* Prevents overwhelming the TCP stack

---

## 11. Resuming After Drain

```js
socket.on("drain", () => {
  fileStream.resume();
});
```

This mirrors server-side logic:

* Client and server **cooperate via backpressure**
* TCP does not automatically throttle userland streams

---

## 12. Ending the Connection

```js
fileStream.on("end", () => {
  socket.end();
});
```

* Signals server that upload is complete
* Triggers server-side `"end"` event
* Clean shutdown of connection

---

## Mental Model to Remember

### Data Flow (Client → Server)

```
File (read stream)
   ↓
Client Socket (write buffer)
   ↓
TCP Network
   ↓
Server Socket (read buffer)
   ↓
File Write Stream
   ↓
Disk
```

### Backpressure Loop

* If consumer is slow → pause producer
* Resume only on `"drain"`
* Always respect `.write()` return value

---

