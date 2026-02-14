# Node.js HTTP Module – Learning Notes

This project is a **learning exercise** to understand how Node.js’s built-in `http` module works at a low level, without using frameworks like Express.

The goal of this README is to act as **personal notes** so that in the future I can quickly refresh:
- how HTTP servers work in Node
- how routing is handled manually
- how streams are used for efficient file handling
- how requests and responses flow internally

---

## What This Server Does

This HTTP server supports:

| Route | Method | Description |
|-----|-------|-------------|
| `/` | GET | Serves `index.html` |
| `/style.css` | GET | Serves CSS file |
| `/login` | POST | Sends a JSON response |
| `/upload` | POST | Streams uploaded file to disk |

---

## Core Concepts Learned

### 1. Creating an HTTP Server

```js
const http = require("http");
const server = http.createServer();
````

* `http.createServer()` creates an **EventEmitter**
* The server emits a `"request"` event for **every incoming HTTP request**
* No routing or middleware exists by default (unlike Express)

---

### 2. The `request` Event

```js
server.on("request", async (request, response) => {
  console.log(request.url, request.method);
});
```

Each request gives access to:

#### `request`

* `request.url` → path (`/`, `/login`, etc.)
* `request.method` → HTTP method (`GET`, `POST`)
* `request` is also a **readable stream** (important for uploads)

#### `response`

* Used to send headers, status code, and body
* `response` is a **writable stream**

---

### 3. Manual Routing (No Framework)

Routing is done using simple condition checks:

```js
if (request.url === "/" && request.method === "GET") {
  ...
}
```

Important takeaway:

* **Node does NOT provide routing**
* Frameworks like Express only abstract this logic
* Understanding this makes debugging frameworks easier

---

### 4. Serving Static Files Using Streams

Example: Serving HTML

```js
const filehandle = await fs.open("./public/index.html", "r");
const fileStream = filehandle.createReadStream();
fileStream.pipe(response);
```

What’s happening:

* File is **not read fully into memory**
* Data flows in chunks:

  ```
  File → ReadStream → Response → Client
  ```
* This is **memory efficient** and scalable

Why streams matter:

* Handles large files safely
* Backpressure is handled automatically by `.pipe()`

---

### 5. Setting Response Headers

```js
response.setHeader("content-type", "text/html");
```

Headers tell the browser:

* How to interpret the response body
* Examples:

  * `text/html`
  * `text/css`
  * `application/json`

Without correct headers:

* Browser may download instead of render
* JSON may be treated as plain text

---

### 6. JSON API Response (Login Route)

```js
if (request.url === "/login" && request.method === "POST") {
  response.setHeader("content-type", "application/json");
  response.statusCode = 200;
  response.end(JSON.stringify({ message: "logging you in" }));
}
```

Key learnings:

* HTTP response must be **string or buffer**
* Objects must be serialized using `JSON.stringify`
* Status codes are set manually

---

### 7. Handling File Uploads with Streams

```js
if (request.url === "/upload" && request.method === "POST") {
  const filehandle = await fs.open("./storage/image.jpeg", "w");
  const writeStreamFile = filehandle.createWriteStream();
  request.pipe(writeStreamFile);
}
```

Important concepts:

#### Request Body Is a Stream

* `request` is a **readable stream**
* Incoming data arrives in chunks

#### Streaming Upload Flow

```
Client → request (read stream) → write stream → file
```

Benefits:

* No buffering entire file in memory
* Suitable for large uploads

---

### 8. Knowing When Upload Is Finished

```js
request.on("end", () => {
  response.statusCode = 200;
  response.end(JSON.stringify({ message: "File uploaded!!.." }));
});
```

Why `end` matters:

* Ensures file is fully written
* Prevents premature response
* `end` fires only after all chunks arrive

---

### 9. Starting the Server

```js
server.listen(9000, () => {
  console.log("Web server is live at http://localhost:9000");
});
```

* Server binds to port `9000`
* Event loop keeps process alive
* Callback confirms server readiness

---

## Mental Model to Remember

When a request comes in:

1. Server emits `"request"`
2. URL + method are inspected
3. Headers are set
4. Streams handle data transfer
5. `response.end()` finalizes the response

---

