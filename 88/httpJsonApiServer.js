const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const theUrl = url.parse(req.url, true);
    const theDate = new Date(theUrl.query.iso); 

    switch (theUrl.pathname) {
        case '/api/parsetime':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                "hour": theDate.getHours(),
                "minute": theDate.getMinutes(),
                "second": theDate.getSeconds()
            }));
            break;
        case '/api/unixtime':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                "unixtime": theDate.getTime()
            }));
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h2 style="color: red">404. No such page</h2>');
    }
});

server.listen(Number(process.argv[2]));

server.on('error', (err) => {
    console.error(err);
});