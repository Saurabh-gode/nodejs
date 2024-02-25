const http = require("node:http");
const fs = require("node:fs/promises");

class Butter {
  constructor() {
    this.server = http.createServer();
    /**
     * {
     *  "get/": () => { ... },
     *  "post/upload": () => { ... }
     * }
     *
     *
     * this.routes["get/"]()
     *
     */
    this.routes = {};
    this.middleware = [];

    this.server.on("request", (req, res) => {
      // Send a file back to the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");
        const fileStream = fileHandle.createReadStream();

        res.setHeader("Content-Type", mime);

        fileStream.pipe(res);
      };

      // Set the status code of the response
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      // Send a json data back to the client (for small json data, less than the highWaterMark)
      res.json = (data) => {
        // This is only good for bodies that their size is less than the highWaterMark value
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      // If the routes object does not have a key of req.method + req.url, return 404
      // if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
      //   return res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
      // }

      // here run middleware functions before the actual callback..
      // this.middleware[0](req, res , ()=>{
      //   this.middleware[1](req,res, ()=>{
      //     this.middleware[3](req, res, ()=>{
      // this.routes[req.method.toLocaleLowerCase() + req.url](req, res);
      //     })
      //   })
      // })
      //

      // recursion of above souln

      const runMiddleware = (req, res, middleware, index) => {
        // base condition
        if (index >= middleware.length) {
          if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
            return res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
          }
          this.routes[req.method.toLocaleLowerCase() + req.url](req, res);

          return;
        }

        middleware[index](req, res, () => {
          runMiddleware(req, res, middleware, index + 1);
        });
      };

      if (this.middleware.length > 0) {
        runMiddleware(req, res, this.middleware, 0);
      } else {
        // If the routes object does not have a key of req.method + req.url, return 404
        if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
          return res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
        }
        this.routes[req.method.toLocaleLowerCase() + req.url](req, res);
      }
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  beforeEach(cb) {
    this.middleware.push(cb);
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Butter;
