const app = require('connect')();
const authorization = require('./authorization');

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
});

app.use('/', (req, res, next) => {
    next();
});

app.use('/home', (req, res, next) => {
    res.end('<h1>Welcome to Connect</h1>');
});

app.use('/about', (req, res, next) => {
    res.end('<h1>Connect is an introduction to Express</h1>');
});

app.use('/admin', authorization);

app.use((req, res, next) => {
    res.end('<h1>Admin Page</h1>');
});

app.use((err, req, res, next) => {
    res.end(`<h1>${err.message}</h1>`);
});

app.listen(80);