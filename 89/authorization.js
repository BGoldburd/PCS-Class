const url = require('url');

module.exports = (req, res, next) => {
    const theUrl = url.parse(req.url, true);
    if(theUrl.query.magicWord !== 'please') {
        next(new Error('Unauthorized user'));
    } else {
        next();
    }
};