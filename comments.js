// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qs = require('querystring');
const comments = require('./comments');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  if (pathname === '/api/comments') {
    if (req.method === 'GET') {
      const data = comments.getComments();
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const data = qs.parse(body);
        comments.addComment(data);
        res.end('success');
      });
    }
  } else {
    const filepath = path.join(__dirname, 'public', pathname);
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }
      res.end(data);
    });
  }
});

server.listen(3000);const http = require('http');
