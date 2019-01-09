var express = require('express');
var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        global.db.query('SELECT * FROM contacts', (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            res.send(results);
        });
    })
    .post((req, res, next) => {
        global.db.query(`INSERT INTO contacts(firstname, lastname, phone, email) 
            VALUES(?, ?, ?, ?)`,
            [req.body.firstname, req.body.lastname, req.body.phone, req.body.email],
            (err, result) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                req.body.id = result.insertId;
                res.status(201).send(JSON.stringify(req.body));
            });
    })
    .put((req, res, next) => {
        global.db.query('UPDATE contacts SET firstname = ?, lastname = ?, phone = ?, email = ? WHERE id = ?',
            [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.id],
            (err, result) => {
                if (err) {
                    return res.status(500).send(err.message);
                }               
                if (result.affectedRows === 0) {
                    return res.status(404).send(`No contact with id ${req.body.id} to update`);
                }
                res.status(204).end();
            });
    });

router.get('/:id', (req, res, next) => {
    global.db.query('SELECT * FROM contacts WHERE id=?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!results.length) {
            return res.status(404).send(`No contact with id ${req.params.id}`);
        }
        res.send(results);
    });
});

router.delete('/:id', (req, res) => {
    global.db.query('SELECT * FROM contacts WHERE id=?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        console.log(results);
        if (!results.length) {
            return res.status(404).send(`No contact with id ${req.params.id}`);
        }

        // eslint-disable-next-line no-unused-vars
        global.db.query('DELETE FROM contacts WHERE id=?', [req.params.id], (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(204).end();
        });
    });
});

module.exports = router;
