const http = require("http");
const fs = require("fs/promises");
const server = http.createServer();

server.on("request", async (request, response) => {
  console.log(request.url, request.method);
  if (request.url === "/" && request.method === "GET") {
    response.setHeader("content-type", "text/html");

    const filehandle = await fs.open("./public/index.html", "r");

    const fileStream = filehandle.createReadStream();
    fileStream.pipe(response);
  }
  if (request.url === "/style.css" && request.method === "GET") {
    response.setHeader("content-type", "text/css");

    const filehandle = await fs.open("./public/style.css", "r");

    const fileStream = filehandle.createReadStream();
    fileStream.pipe(response);
  }

  if (request.url === "/login" && request.method === "POST") {
    response.setHeader("content-type", "application/json");
    response.setHeader("content-type", "application/json");

    response.statusCode = 200;

    const body = {
      message: "logging you in",
    };

    response.end(JSON.stringify(body));
  }

  if (request.url === "/upload" && request.method === "POST") {
    const filehandle = await fs.open("./storage/image.jpeg", "w");

    const writeStreamFile = filehandle.createWriteStream();
    request.pipe(writeStreamFile);

    request.on("end", () => {
      response.statusCode = 200;
      response.end(JSON.stringify({ message: "File uploaded!!.." }));
    });
  }
});

server.listen(9000, () => {
  console.log("Web server is live at http://localhost:9000");
});
