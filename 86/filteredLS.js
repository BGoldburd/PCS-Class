const fs = require('fs');
const path = require('path');

const directory = process.argv[2];
const ext = process.argv[3];

fs.readdir(directory, (err, list) => {
    if (err) {
        return console.log(err);
    }
    list.filter(file => {
        return path.extname(file) === '.' + ext;
    }).forEach(file => {
        console.log(file);
    });
});