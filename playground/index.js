const http = require("node:http");

// http
//   .createServer((request, response) => {
//     const { headers, method, url } = request;
//     let body = [];
//     request
//       .on("error", (err) => {
//         console.error(err);
//       })
//       .on("data", (chunk) => {
//         body.push(chunk);
//       })
//       .on("end", () => {
//         body = Buffer.concat(body).toString();
//         // BEGINNING OF NEW STUFF

//         response.on("error", (err) => {
//           console.error(err);
//         });

//         response.statusCode = 200;
//         response.setHeader("Content-Type", "application/json");
//         // Note: the 2 lines above could be replaced with this next one:
//         // response.writeHead(200, {'Content-Type': 'application/json'})

//         const responseBody = { headers, method, url, body };

//         response.write(JSON.stringify(responseBody));
//         response.end();
//         // Note: the 2 lines above could be replaced with this next one:
//         // response.end(JSON.stringify(responseBody))

//         // END OF NEW STUFF
//       });
//   })
//   .listen(8080);

const port = 4080;
const hostname = "192.168.0.102";

const server = http.createServer((req, res) =>
{
  const data = { message: "Hi there!" };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Connection", "close");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
})


server.listen(port, hostname, () =>
{
  console.log(`server is listening on http://${hostname}:${port}`);
})
