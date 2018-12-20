const http = require('http');

const url = process.argv[2];

http.get(url, res => {
    res.setEncoding('utf8');
    res.on('data', d => console.log(d));
    res.on('error', e => console.error(e));
}).on('error', e => console.log(e));