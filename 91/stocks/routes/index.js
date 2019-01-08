var express = require('express');
var router = express.Router();
const https = require('https');
const bl = require('bl');

let attemptedLogin = false;

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Stocks', userName: global.userName, partials: { searchLogin: global.id ? 'searchLoggedin' : 'searchLogin' } });
});

router.route('/login')
  .get((req, res, next) => {
    res.render('index', {
      invalidLogin: attemptedLogin,
      css: ['loginRegister.css'],
      partials: {
        content: 'login'
      }
    });
  })
  .post((req, res, next) => {
    global.db.query('SELECT id FROM users WHERE user_name = ? AND password = ?',
            [req.body.userName, req.body.password],
            (err, results) => {
                if (err) {
                    return next(err);
                }
                if (results.length) {
                  results.forEach(result => {
                    global.id = result.id;
                  });
                  global.userName = req.body.userName;
                  res.redirect('/');
                } else {
                  attemptedLogin = true;
                  res.redirect('/login');
                }
                
            });
  });

router.route('/register')
  .get((req, res, next) => {
    res.render('index', {
      css: ['loginRegister.css'],
      partials: {
        content: 'register'
      }
    });
  })
  .post((req, res, next) => {
    global.db.query(`INSERT INTO users(user_name, password) VALUES(?, ?)`,
            [req.body.userName, req.body.password],
            (err, result) => {
                if (err) {
                    return next(err);
                }
                global.id = result.insertId;
                global.userName = req.body.userName;
                res.redirect('/');
            });
  });

router.get('/logout', (req, res, next) => {
  global.id = null;
  attemptedLogin = false;
  res.render('index', {
    title: 'Stocks',
    css: ['loggedOut.css'],
    partials: {
      searchLogin: 'searchLogin',
      content: 'loggedOut'
    }
  });
});

router.post('/searchResults', (req, res, next) => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.body.symbol}&apikey=3PUJ614C8Q8MBCAR`;
  
  https.get(url, response => {
    response.pipe(bl((err, data) => {
      if (err) {
          console.error(err);
      } else {
        let searchArray = JSON.parse(data)["bestMatches"];
        let newArray = searchArray.map(result => {
          return {
            symbol: result["1. symbol"],
            name: result["2. name"],
            type: result["3. type"],
            region: result["4. region"],
            url: global.id ? `/favoriteAdded/${result["1. symbol"]}/${result["2. name"]}/${result["3. type"]}/${result["4. region"]}` : '/login'
          };
        });
        res.render('index', {
          results: newArray,
          css: ['results.css'],
          userName: global.userName,
          partials: {
            searchLogin: global.id ? 'searchLoggedin' : 'searchLogin',
            content: 'searchResults'
          }
        });
      }
    }));
  }).on('error', e => console.log(e));
});

router.get('/stockInfo/:symbol/:name', function(req, res, next) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.symbol}&apikey=3PUJ614C8Q8MBCAR`;
  const stockName = req.params.name;

  https.get(url, response => {
    response.pipe(bl((err, data) => {
      if (err) {
          console.error(err);
      } else {
        let dataObject = JSON.parse(data)['Time Series (Daily)'];
        let dates = Object.keys(dataObject);
        let newObject = dates.map(date => {
          return {
            date: new Date(date).toDateString(),
            open: dataObject[date]['1. open'],
            high: dataObject[date]['2. high'],
            low: dataObject[date]['3. low'],
            close: dataObject[date]['4. close'],
            volume: dataObject[date]['5. volume']
          };
        });
        res.render('index', {
          stockName: stockName,
          stockData: newObject,
          userName: global.userName,
          css: ['stocks.css'],
          partials: {
            searchLogin: global.id ? 'searchLoggedin' : 'searchLogin',
            content: 'stockInfo'
          }
        });
      }
    }));
  }).on('error', e => console.log(e));

});

router.get('/favoriteAdded/:symbol/:name/:type/:region', (req, res, next) => {
  global.db.query(`INSERT INTO favorites(user_id, symbol, name, type, region) 
            VALUES(?, ?, ?, ?, ?)`,
            [global.id, req.params.symbol, req.params.name, req.params.type, req.params.region],
            (err, result) => {
                if (err) {
                    return next(err);
                }
                res.render('index', {
                  css: ['favoriteAdded.css'],
                  partials: {
                    content: 'favoriteAdded',
                    searchLogin: 'searchLoggedin'
                  }
                });
            });
});

router.get('/favorites', (req, res, next) => {
  global.db.query('SELECT * FROM favorites WHERE user_id = ?', [global.id],
            (err, results) => {
                if (err) {
                    return next(err);
                }
                res.render('index', {
                  favorites: results,
                  css: ['favorites.css'],
                  userName: global.userName,
                  partials: {
                    searchLogin: 'searchLoggedin',
                    content: 'favorites'
                  }
                });
            });
});

module.exports = router;
