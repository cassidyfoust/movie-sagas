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
        let queryText = 'SELECT * FROM movies ORDER BY title;';
        pool.query(queryText)
            .then((result) => { res.send(result.rows); })
            .catch((err) => {
                console.log('Error completing SELECT movie query', err);
                res.sendStatus(500);
            })
});

// search route

app.get('/search', (req, res) => {
    let searchTerm = `%${req.query.q}%`
    if (req.query.q == undefined || req.query.q == "") {
        let queryText = 'SELECT * FROM "movies" ORDER BY title;';
        pool.query(queryText).then(result => {
            // Sends back the results in an object
            res.send(result.rows);
        })
            .catch(error => {
                console.log('error getting treats', error);
                res.sendStatus(500);
            });
    }
    else {
        let queryText = 'SELECT * FROM "movies" WHERE "title" LIKE $1 ORDER BY title;';
        pool.query(queryText, [searchTerm]).then(result => {
            // Sends back the results in an object
            res.send(result.rows);
        })
            .catch(error => {
                console.log('error getting movies', error);
                res.sendStatus(500);
            });
    }
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

// route to update movie details

app.put('/', (req, res) => {
    const updatedMovie = req.body;
    let queryText = ''
    let queryValues = []
    if (updatedMovie.title == ''){
        queryText = `UPDATE movies
        SET "description" = $1 WHERE id=$2;`;
        queryValues = [
            updatedMovie.description,
            updatedMovie.id
        ];
    }
    else if (updatedMovie.description == ''){
        queryText = `UPDATE movies
        SET "title" = $1 WHERE id=$2;`;

        queryValues = [
            updatedMovie.title,
            updatedMovie.id
        ];
    }
    else {
        queryText = `UPDATE movies
    SET "title" = $1, "description" = $2 WHERE id=$3;`;

        queryValues = [
            updatedMovie.title,
            updatedMovie.description,
            updatedMovie.id
        ];
    }
console.log(req.body)
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing UPDATE movies query', err);
            res.sendStatus(500);
        });
});

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});