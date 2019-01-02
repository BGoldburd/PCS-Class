var express = require('express');
var router = express.Router();
let contacts = [
  {
    id: 1,
    name: 'Donald Trump',
    phone: '123-456-7890',
    email: 'dtrump@whitehouse.gov'
  },
  {
    id: 2,
    name: 'Mike Pence',
    phone: '111-222-3333',
    email: 'mpence@whitehouse.gov'
  },
  {
    id: 3,
    name: 'Jared Kushner',
    phone: '444-555-6666',
    email: 'jkushner@whitehouse.gov'
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contacts', function(req, res, next) {
  res.render('index', { title: 'Contacts', contacts: contacts, partials: { content: 'form' } });
});

router.post('/contacts', function(req, res, next) {
  console.log(req.body);
  contacts.push({id: contacts.length + 1, ...req.body});
  res.render('index', { title: 'Contacts', contacts: contacts, partials: { content: 'form' } });
});

router.get('/api/contacts', function(req, res, next) {
  res.send(contacts);
});

router.post('/api/contacts', function(req, res, next) {
  contacts.push({id: contacts.length + 1, ...req.body});
  res.send(contacts);
});

module.exports = router;
