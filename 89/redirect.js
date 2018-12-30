module.exports = (req, res, next) => {
    if (req.url === '/') {
        res.statusCode = 301;
        res.setHeader('Location', '/home');
        res.end();
    } else {
        res.statusCode = 404;
        res.end('<h1>404</h1>');
    }   
};