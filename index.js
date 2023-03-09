const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    if (q.pathname == '/') {
      q.pathname = "/index";
    }
    console.log('pathname', q.pathname)
    const filename = `.${q.pathname}.html`;
    fs.readFile(filename, function (err, data) {
      console.log('filename', filename);
      if (err) {
        console.log(err);
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
