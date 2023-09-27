var http = require("http");
var fs = require("fs");

function getType(_url) {
  var types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}

var server = http.createServer((req, res) => {
  var url =
    "public" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": getType(url) });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

var port = 8000;
server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
