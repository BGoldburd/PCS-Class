const http = require('http');
const bl = require('bl');

const urls = [
    process.argv[2],
    process.argv[3],
    process.argv[4]
];

let callbacks = 0;
let dataReceived = [];

function printData() {
    dataReceived.forEach(data => console.log(data));
}

function getData(index) {
    http.get(urls[index], res => {
        res.pipe(bl((err, data) => {
            if(err) {
                return console.error(err);
            }
            dataReceived[index] = data.toString();
            callbacks++;
            if(callbacks === 3) {
                printData();
            }
        }));
    });
}

for(let i = 0; i < 3; i++) {
    getData(i);
}