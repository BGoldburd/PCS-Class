const net = require('net');

const server = net.createServer(socket => {
    function pad(num) {
        return num < 10 ? '0' + num : num;
    }

    const date = new Date();

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    
    const dateString = `${year}-${month}-${day} ${hours}:${minutes}`;

    socket.end(dateString + '\n');
});

server.listen(Number(process.argv[2]));

server.on('error', (err) => {
    console.error(err);
});