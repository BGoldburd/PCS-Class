const http = require('http');
const map = require('through2-map');

const server = http.createServer((req, res) => {
    if(req.method === 'POST') {
        req.pipe(map(chunk => {
            return chunk.toString().toUpperCase();
        })).pipe(res);
    }
});

server.listen(Number(process.argv[2]));

server.on('error', (err) => {
    console.error(err);
});