var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');

//get the list of coaches with corresponding id
router.get('/coach/:id', function (req, res) {
    console.log('id', req.params.id);
    var theId = '';
    theId = req.params.id.toString();
    var role = 'coach'; // this is the role we are querying
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // No connection to database was made - error
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // 'UPDATE "hotel_pets" SET "name" = $1, "breed" = $2, "color" = $3 WHERE "id" = $4;';
            // We connected to the db!!!!! pool -1
            var queryText = 'SELECT * FROM "users" where "gym_id" = $1 and "user_role" = $2;';
            db.query(queryText, [theId, role], function (errorMakingQuery, result) {
                done(); // add + 1 to pool - we have received a result or error
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    console.log('rows', result.rows);
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
});

//get the list of coaches with corresponding id
router.get('/parent/:id', function (req, res) {
    console.log('id', req.params.id);
    var theId = '';
    theId = req.params.id.toString();
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // No connection to database was made - error
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // 'UPDATE "hotel_pets" SET "name" = $1, "breed" = $2, "color" = $3 WHERE "id" = $4;';
            // We connected to the db!!!!! pool -1
            var queryText = 'SELECT * FROM "users" where "gym_id" = $1 and "role" like "coach";';
            db.query(queryText, [theId], function (errorMakingQuery, result) {
                done(); // add + 1 to pool - we have received a result or error
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
});


module.exports = router;
