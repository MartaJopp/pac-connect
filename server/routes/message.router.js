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
        var from = req.user.id;
        var from_name = req.user.name;
        
        var message = req.body;

        console.log('to', to);

        if (req.body.to_id === '') {
            var to = req.user.coach_id;
        }
        else {
            var to = req.body.to_id;
        }

        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                //connected to the database inserting into conversation
                var queryText = 'INSERT INTO "conversations" ("subject", "to_user_id", "from_user_id") VALUES ($1, $2, $3) returning conversation_id;';
                db.query(queryText, [message.subject, to, from], function (errorMakingQuery, result) {
                    // We have received an error or result at this point
                    
                    done(); // pool +1
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        // Send back success!
                        console.log('result',result.rows);
                        var conversationId = result.rows[0].conversation_id;

                        pool.connect(function (errorConnectingToDb, db, done) {
                            if (errorConnectingToDb) {
                                console.log('Error connecting', errorConnectingToDb);
                                res.sendStatus(500);
                            } else {
                                //connected to the database

                                var queryText = 'INSERT INTO "messages" ("message", "to_user_id", "from_user_id", "conversation_id", "from_name") VALUES ($1, $2, $3, $4, $5);';
                                db.query(queryText, [message.message, to, from, conversationId, from_name], function (errorMakingQuery, result) {
                                    console.log('req.body after inserting', req.body);
                                    done(); // pool +1
                                    if (errorMakingQuery) {
                                        console.log('Error making query', errorMakingQuery);
                                        res.sendStatus(500);
                                    } else {
                                        // Send back success!
                                        res.sendStatus(201);
                                    }
                                }); // END QUERY
                            } // end else before insert into messages
                        }); // END POOL

                    } // end else before pool connect
                }); // END QUERY
            } // end else
        }); // end pool 
    } // end if
    else {
        console.log('user is not authenticated');
    }
})   // end Parent/Gymnast POST ROUTE MESSAGES

//get gymnast messages
router.get('/gymnast/', function (req, res) {
    if (req.isAuthenticated()) {
        var loggedIn = req.user.id;
        console.log('The following is logged in /gymnast', req.user);
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT * FROM "messages" JOIN "users" on "users"."id" = "messages"."to_user_id" JOIN "conversations" ON "conversations"."conversation_id" = "messages"."conversation_id" WHERE "messages"."to_user_id" = $1 OR "messages"."from_user_id" = $1;';
                db.query(queryText, [loggedIn], function (errorMakingQuery, result) {
                    done(); // add + 1 to pool - we have received a result or error
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    }
                    else {

                        res.send(result.rows);
                    }
                }
                ); // END QUERY
            }
        }); // END POOL
    } // end req.authenticated if statement
    else {
        console.log('Not an authenticated user')
    }
});// end get messages route


module.exports = router;
