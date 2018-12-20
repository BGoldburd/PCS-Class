const http = require('http');

const url = process.argv[2];

http.get(url, res => {

    let responseBody = "";

    res.setEncoding('utf8');

    res.on('data', data => {
        responseBody += data;
    });

    res.on('error', e => console.error(e));

    res.on('end', () => {
        console.log(responseBody.length);
        console.log(responseBody);
    });
}).on('error', e => console.error(e));