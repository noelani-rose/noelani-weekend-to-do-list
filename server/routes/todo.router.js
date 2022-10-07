const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {

    pool.query(`SELECT * FROM "todo";`)

        .then((dbRes) => {
        console.log(dbRes.rows)
            res.send(dbRes.rows)
        })
        .catch ((err) => {
            console.log('getting db response failed...', err);
            res.sendStatus(500);
        })
});


router.post('/', (req, res) => {
    console.log('posting incoming task...', req.body);
    let newTask = req.body

    const sqlText = `
    INSERT INTO "todo" ("task", "complete")
    VALUES ($1, $2);
    `;

    const sqlParams = [
        req.body.task,
        req.body.completed
    ];

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('posting new task failed', err);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res) => {
    console.log('in router delete with id...', req.params.id);
    let sqlText = 'DELETE FROM "todo" WHERE "id" = $1;'

    let sqlParams = [req.params.id];

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error deleting task', err);
            res.sendStatus(500);
        })
})


module.exports = router;