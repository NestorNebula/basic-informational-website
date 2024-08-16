const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    const page = (q.pathname === '/' ? 'index' : `.${q.pathname}`) + '.html';
    fs.readFile(page, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.readFile('404.html', (err, data) => {
          if (err) return res.end('Unknown Error');
          res.write(data);
          return res.end();
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
