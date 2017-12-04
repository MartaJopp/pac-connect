var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


router.post('/', function (req, res) {
    if (req.isAuthenticated()) { 
        var attendance = req.body

        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } //end if error connection to db
            else {
                var queryText = 'INSERT INTO "attendance" ("gymnast_id", "status", "date") VALUES ($1, $2, $3);';
                db.query(queryText, [attendance.gymnastId, attendance.status, attendance.date], function (errorMakingQuery, result) {
                    done(); // add + 1 to pool - we have received a result or error
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    }
                    else {

                        res.sendStatus(201);
                    }
                }
                ); // END QUERY

            }

        }); // end pool connect


    } // end req.isAuthenticated
    else {
        console.log('User is not authenticated')
    }
}) // end POST route for attendance

router.get('/', function (req,res){
    if (req.isAuthenticated()) {
        coachId = req.user.id;

        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } //end if error connection to db
            else {
                var queryText = 'SELECT * from attendance join users on "users"."id" = "attendance"."gymnast_id" where "users"."coach_id" = $1 ORDER BY "attendance"."date" DESC;';
                db.query(queryText, [coachId], function (errorMakingQuery, result) {
                    done(); // add + 1 to pool - we have received a result or error
                    var attendanceArray = []
                    for (var i = 0; i < result.rows.length; i++) {
                        attendanceArray.push({ name: (result.rows[i].name), date: (result.rows[i].date), status: (result.rows[i].status), gymnast_id: (result.rows[i].gymnast_id), id: (result.rows[i].attId) })

                    }
                        if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    }
                    else {

                        res.send(attendanceArray);
                    }
                }
                ); // END QUERY

            }

        }); // end pool connect


    } // end req.isAuthenticated
    else {
        console.log('User is not authenticated')
    }
})

//end get route for team attendance

router.get('/dates/', function (req, res) {
    if (req.isAuthenticated()) {
        coachId = req.user.id;

        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } //end if error connection to db
            else {
                var queryText = 'SELECT DISTINCT date FROM attendance JOIN users on users.id = attendance.gymnast_id WHERE users.coach_id=$1 ORDER BY date DESC;';
                db.query(queryText, [coachId], function (errorMakingQuery, result) {
                    done(); // add + 1 to pool - we have received a result or error
                    console.log('result.rows', result.rows);
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
}) //end get date dropdown for filter

router.put('/:id', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('id', req.params.id);
        console.log('body', req.body);
        var attId = req.params.id;
        var date = req.body.date;
        var status = req.body.status;
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            var queryText = 'UPDATE "attendance" SET "status" = $1, "date" = $2 WHERE "attId" = $3;';
            client.query(queryText, [status, date, attId], function (errorMakingQuery, result) {
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

router.get('/gymnastAtt/', function (req, res) {
    if (req.isAuthenticated()) {
        gymnastId = req.user.id;

        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } //end if error connection to db
            else {
                var queryText = 'SELECT * FROM attendance WHERE gymnast_id = $1 ORDER BY date DESC;';
                db.query(queryText, [gymnastId], function (errorMakingQuery, result) {
                    done(); // add + 1 to pool - we have received a result or error
                    console.log('result.rows', result.rows);
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
}) //end get gymnast attendance

router.get('/childAtt/', function (req, res) {
    if (req.isAuthenticated()) {
        parentId = req.user.id;

        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                // No connection to database was made - error
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } //end if error connection to db
            else {
                var queryText = 'SELECT * FROM ATTENDANCE JOIN users on attendance.gymnast_id = users.id WHERE users.parent_id = $1 ORDER BY attendance.date DESC;';
                db.query(queryText, [parentId], function (errorMakingQuery, result) {
                    done(); // add + 1 to pool - we have received a result or error
                    var attendanceArray = []
                    for (var i = 0; i < result.rows.length; i++) {
                        attendanceArray.push({ name: (result.rows[i].name), date: (result.rows[i].date), status: (result.rows[i].status)  })

                    }
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    }
                    else {

                        res.send(attendanceArray);
                    }
                }
                ); // END QUERY

            }

        }); // end pool connect


    } // end req.isAuthenticated
    else {
        console.log('User is not authenticated')
    }
}) //end get child attendance

// delete attendance record
router.delete('/delete:id/', function (req, res) {
    if (req.isAuthenticated()) {
        var deleteRecord = req.params.id;
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            var queryText = 'DELETE FROM "attendance" WHERE "attId" = $1;';
            client.query(queryText, [deleteRecord], function (errorMakingQuery, result) {
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
) //end delete route

module.exports = router;