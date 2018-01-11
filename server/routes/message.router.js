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
        var picurl = req.body.picture.url;
        var picname = req.body.picture.filename;

        console.log('picture url', picurl)

        console.log('to', to);

        if (req.body.to_id === '') {
            var to = parseInt(req.user.coach_id);
        }
        else {
            var to = req.body.to_id;
        }
        console.log('should be setting to a number var to', to);
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
                        console.log('result', result.rows);
                        var conversationId = result.rows[0].conversation_id;

                        pool.connect(function (errorConnectingToDb, db, done) {
                            if (errorConnectingToDb) {
                                console.log('Error connecting', errorConnectingToDb);
                                res.sendStatus(500);
                            } else {
                                //connected to the database

                                var queryText = 'INSERT INTO "messages" ("message", "to_user_id", "from_user_id", "conversation_id", "from_name", "picture_url", "picture_filename") VALUES ($1, $2, $3, $4, $5, $6, $7);';
                                db.query(queryText, [message.message, to, from, conversationId, from_name, picurl, picname], function (errorMakingQuery, result) {
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
                var queryText = 'SELECT * FROM "messages" JOIN "users" on "users"."id" = "messages"."to_user_id" JOIN "conversations" ON "conversations"."conversation_id" = "messages"."conversation_id" WHERE "messages"."to_user_id" = $1 ORDER BY "messages"."message_id" DESC, "messages"."conversation_id" DESC;';
                db.query(queryText, [loggedIn], function (errorMakingQuery, result) {
                    done(); // add + 1 to pool - we have received a result or error
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    }
                    else {
                        console.log(result.rows)
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

router.get('/sent/', function (req, res) {
    if (req.isAuthenticated()) {
        var loggedIn = req.user.id;
        console.log('The following is logged in /gymnast', req.user);
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT * FROM "messages" JOIN "users" on "users"."id" = "messages"."to_user_id" JOIN "conversations" ON "conversations"."conversation_id" = "messages"."conversation_id" WHERE "messages"."from_user_id" = $1 ORDER BY "messages"."message_id" DESC, "messages"."conversation_id" DESC;';
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

//post reply messages
router.post('/reply/', function (req, res) {
    console.log('reply being sent', req.body);
    console.log('req.user id', req.user.id)
    if (req.isAuthenticated()) {

        if (req.user.user_role === 'gymnast') {
            var fromId = req.user.id;
            var fromName = req.user.name;
            var replyMessage = req.body;
            replyMessage.replyTo = req.user.coach_id;
        }

        if (req.user.user_role === 'parent') {
            var fromId = req.user.id;
            var fromName = req.user.name;
            var replyMessage = req.body;
            replyMessage.replyTo = req.user.coach_id;
        }

        if (req.user.user_role === 'coach') {
            var fromId = req.user.id;
            var fromName = req.user.name;
            var replyMessage = req.body
            replyMessage.replyTo = req.body.replyTo
        }
        console.log('the body', req.body)
        console.log('this is who it is going to', replyMessage.replyTo)
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } //end if error connection to db
            else {
                var queryText = 'INSERT INTO "messages" ("message", "to_user_id", "from_user_id", "conversation_id", "from_name", "picture_url", "picture_filename") VALUES ($1, $2, $3, $4, $5, $6, $7) ;';
                db.query(queryText, [replyMessage.replyMessage, replyMessage.replyTo, fromId, replyMessage.conversation_id, fromName, replyMessage.picture.url, replyMessage.picture.filename], function (errorMakingQuery, result) {
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

        }); // end pool connect


    } // end req.isAuthenticated
    else {
        console.log('User is not authenticated')
    }
}) // end POST route for reply messages

//get athlete and coach messages
router.get('/athCoach', function (req, res) {
    if (req.isAuthenticated()) {
        var loggedIn = req.user.id;
        console.log('The following is logged in /gymnast', req.user);
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT * FROM "messages" JOIN "user_gymnast" on "messages"."to_user_id" = "user_gymnast"."gymnast_id" OR "messages"."from_user_id" = "user_gymnast"."gymnast_id" JOIN "conversations" on "conversations"."conversation_id" = "messages"."conversation_id" WHERE "user_gymnast"."parent_id" = $1 ORDER BY "messages"."message_id" DESC;';
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
});// end get messages for coach and athlete route

router.put('/read/:id', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('message id', req.params.id)
        var messageId = req.params.id;
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            var queryText = 'UPDATE "messages" SET "read" = true WHERE "message_id" = $1;';
            client.query(queryText, [messageId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(201); // send back success
                }
            } //end query function 
            ) // end query parameters
        } //end pool function
        ) // end pool connect     
    }// end if req.isAuthenticated
    else {
        console.log('User is not authenticated');
    } //end authentication else statement
}
) //end update route

router.put('/parentRead/:id', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('message id', req.params.id)
        var messageId = req.params.id;
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            var queryText = 'UPDATE "messages" SET "parentRead" = true WHERE "message_id" = $1;';
            client.query(queryText, [messageId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(201); // send back success
                }
            } //end query function 
            ) // end query parameters
        } //end pool function
        ) // end pool connect     
    }// end if req.isAuthenticated
    else {
        console.log('User is not authenticated');
    } //end authentication else statement
}
) //end update route

module.exports = router;
