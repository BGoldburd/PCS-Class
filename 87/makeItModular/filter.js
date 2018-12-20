const fs = require('fs');
const path = require('path');

function filter(directory, ext, callback) {
    fs.readdir(directory, (err, list) => {
        if (err) {
            return callback(err);
        }
        let filteredList = list.filter(f => path.extname(f) === '.' + ext);
        callback(null, filteredList);
    });
}

module.exports = filter;