var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


// starts initial thread from gymnast/parent to coach
router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('This is the User', req.user.id);
        console.log('This is everything about the user', req.user.coach_id);
        console.log('This is the body', req.body);
        var from = req.user
        var message = req.body

        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                //connected to the database inserting into thread and getting populated thread_id
                var queryText = 'INSERT INTO "thread" ("subject") VALUES ($1) returning thread_id;';
                db.query(queryText, [message.subject], function (errorMakingQuery, result) {
                    // We have received an error or result at this point
                    console.log('req.body after inserting', req.body);
                    var threadId = result.rows[0].thread_id;
                    done(); // pool +1
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        // Send back success!

                        pool.connect(function (errorConnectingToDb, db, done) {
                            if (errorConnectingToDb) {
                                console.log('Error connecting', errorConnectingToDb);
                                res.sendStatus(500);
                            } else {
                                //connected to the database
                                //Inserting id of the one who sent the message into user thread
                                var queryText = 'INSERT INTO "user_thread" ("user_id", "thread_id") VALUES ($1, $2);';
                                db.query(queryText, [req.user.id, threadId], function (errorMakingQuery, result) {
                                    console.log('req.body after inserting', req.body);
                                    done(); // pool +1
                                    if (errorMakingQuery) {
                                        console.log('Error making query', errorMakingQuery);
                                        res.sendStatus(500);
                                    } else {
                                        // Send back success!
                                        pool.connect(function (errorConnectingToDb, db, done) {
                                            if (errorConnectingToDb) {
                                                console.log('Error connecting', errorConnectingToDb);
                                                res.sendStatus(500);
                                            } else {
                                                // inserting the sent message and corresponding threadId, user_id is that who will receive the message
                                                var queryText = 'INSERT INTO "message" ("timestamp", "message", "received_id", "thread_id") VALUES ($1, $2, $3, $4);';
                                                db.query(queryText, [req.body.date, req.body.message, req.user.coach_id, threadId], function (errorMakingQuery, result) {
                                                    done(); // pool +1
                                                    if (errorMakingQuery) {
                                                        console.log('Error making query', errorMakingQuery);
                                                        res.sendStatus(500);
                                                    } else {
                                                        // Send back success!
                                                        res.sendStatus(201);
                                                    }
                                                }); // END QUERY
                                            }
                                        }); // END POOL
                                    }
                                }); // END QUERY
                            }
                        }); // END POOL
                    }
                }); // END QUERY
            }
        }); // END POOL

    } // end if req.authenticated

    else {
        console.log('User is not authenticated');
        res.sendStatus(403)
    }

}); // end Parent/Gymnast POST ROUTE MESSAGES



module.exports = router;
