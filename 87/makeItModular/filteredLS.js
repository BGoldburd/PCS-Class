const filter = require('./filter');

const directory = process.argv[2];
const ext = process.argv[3];

function printList(err, list) {
    if (err) {
        return console.log(err);
    }
    list.forEach(file => {
        console.log(file);
    });
}

filter(directory, ext, printList);

