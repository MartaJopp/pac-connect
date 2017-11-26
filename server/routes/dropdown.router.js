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
}); // end coaches dropdown

//get the list of coaches with corresponding id
router.get('/parent/:id', function (req, res) {
    console.log('id', req.params.id);
    var theId = '';
    theId = req.params.id.toString();
    var role = 'parent'
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
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // end parent dropdown

//get list of gymnasts per logged in coach
router.get('/coachesTeam/', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('This is the User', req.user.id);
        var coachId = parseInt(req.user.id);
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT * FROM "user_gymnast" JOIN "users" on "users"."id" = "user_gymnast"."gymnast_id" JOIN "gymnast_properties" on "gymnast_properties"."user_id" = "user_gymnast"."gymnast_id" WHERE "user_gymnast"."coach_id" = $1;';
                db.query(queryText, [coachId], function (errorMakingQuery, result) {
                    done();
                    var gymnastArray = []
                    for (var i = 0; i < result.rows.length; i++) {
                        gymnastArray.push({ name: (result.rows[i].name), level: (result.rows[i].level), gymnast_id: (result.rows[i].gymnast_id)})

                    }
                    // console.log('result.rows', result.rows); // add + 1 to pool - we have received a result or error
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(gymnastArray);
                    }
                }); // END QUERY
            }
        }); // END POOL
    }
    else {
        res.sendStatus(403)
    }

}); //end get route for Team information

//get list of parents per logged in coach
router.get('/coachesParents/', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('This is the User', req.user.id);
        var coachId = parseInt(req.user.id);
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT DISTINCT ON (parent_id) "user_gymnast"."parent_id", "users"."name" from "user_gymnast" JOIN "users" on "users"."id" = "user_gymnast"."parent_id" WHERE "user_gymnast"."coach_id" = $1;';
                db.query(queryText, [coachId], function (errorMakingQuery, result) {
                    done();
                    console.log('result', result);
                    var parentArray = []
                    for (var i = 0; i < result.rows.length; i++) {
                        parentArray.push({ name: (result.rows[i].name), parent_id: (result.rows[i].id) })

                    }
                    // console.log('result.rows', result.rows); // add + 1 to pool - we have received a result or error
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(parentArray);
                    }
                }); // END QUERY
            }
        }); // END POOL
    }
    else {
        res.sendStatus(403) //req is not authenticated
    }

}); //end get route for parent information

module.exports = router;
