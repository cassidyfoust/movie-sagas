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

//route to get all genres
app.get('/genres', (req, res) => {
    const queryText = `SELECT * from "genres";`
    pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing genres query', err);
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
    if (updatedMovie.title == '' && updatedMovie.description !== ''){
        queryText = `UPDATE movies
        SET "description" = $1 WHERE id=$2`;
        queryValues = [
            updatedMovie.description,
            updatedMovie.id,
        ];
    }
    else if (updatedMovie.description == '' && updatedMovie.title !== ''){
        queryText = `UPDATE movies
        SET "title" = $1 WHERE id=$2;`;

        queryValues = [
            updatedMovie.title,
            updatedMovie.id
        ];
    }
    else if (updatedMovie.description!== '' && updatedMovie.title !==''){
        queryText = `UPDATE movies
    SET "title" = $1, "description" = $2 WHERE id=$3;`
        queryValues = [
            updatedMovie.title,
            updatedMovie.description,
            updatedMovie.id,
        ];
    }
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing UPDATE movies query', err);
            res.sendStatus(500);
        });
});

// update genres in edit page

app.post('/update', (req, res) => {
    console.log(req.body)
    const updatedMovie = req.body;
    let queryText1 = ''
    let queryValues = [updatedMovie.id,updatedMovie.genreId]
    if (updatedMovie.genreId !== '') {
        queryText1 = 'INSERT INTO "movie_genre" ("movie_id", "genre_id") VALUES ($1, $2);';
    }
    console.log(queryText1, queryValues)
    pool.query(queryText1, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing UPDATE movie genre query', err);
            res.sendStatus(500);
        });
});

// delete genres request

app.delete('/delete/:deleteInfo', (req, res) => {
    console.log(req.params.deleteInfo)
    const updatedMovie = req.body;
    let queryText1 = ''
    let queryValues = req.params.deleteInfo.split('-')
    if (updatedMovie.genreDeleteId !== '') {
        queryText1 = 'DELETE from "movie_genre" where "movie_id" = $1 and "genre_id" = $2;';
    }
    console.log(queryText1, queryValues)
    pool.query(queryText1, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing DELETE movie genre query', err);
            res.sendStatus(500);
        });
});

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});