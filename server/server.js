const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const pool = require('./modules/pool');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/

app.get('/movies/', (req, res) => {
    const queryText = 'SELECT * FROM movies;';
    pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing SELECT movie query', err);
            res.sendStatus(500);
        });
});

// route to get details for selected movie

app.get('/movies/genres/:id', (req, res) => {
    const queryText = `SELECT "genres".name FROM "movies"
    JOIN "movie_genre" ON "movies".id = "movie_genre".movie_id
    JOIN "genres" ON "genres".id = "movie_genre".genre_id
    WHERE "movies".id = $1;`
    pool.query(queryText, [req.params.id])
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing DETAILS movie query', err);
            res.sendStatus(500);
        });
});

app.get('/movies/detail/:id', (req, res) => {
    const queryText = `SELECT * FROM "movies" where id=$1;`
    pool.query(queryText, [req.params.id])
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing DETAILS movie query', err);
            res.sendStatus(500);
        });
});

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});