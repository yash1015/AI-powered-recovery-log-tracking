const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// log file path
const logFile = path.join(__dirname, 'logs', 'app.log');

// logging function
function log(level, message) {
  const time = new Date().toISOString();
  const logMessage = `${time} [${level}] ${message}\n`;

  fs.appendFile(logFile, logMessage, (err) => {
    if (err) {
      console.error("Logging failed:", err);
    }
  });
}

const server = http.createServer((req, res) => {

  // log every request
  log("INFO", `Request received: ${req.url}`);

  // simulate an application error
  if (req.url === "/simulate-error") {
    log("ERROR", "Database connection refused");

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end("Simulated server error");
    return;
  }

  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(__dirname, 'public', url);
  const ext = path.extname(filePath);

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json'
  };

  fs.readFile(filePath, (err, data) => {

    if (err) {
      log("ERROR", `File not found: ${filePath}`);

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(data);
  });

});

server.listen(PORT, () => {
  log("INFO", `Server started on port ${PORT}`);
  console.log(`🚀 DevOps Quiz App running at http://localhost:${PORT}`);
});