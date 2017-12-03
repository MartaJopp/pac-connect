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







module.exports = router;