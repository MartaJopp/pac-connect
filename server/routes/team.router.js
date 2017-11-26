var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


// delete gymnast from team
router.delete('/delete:id/', function (req,res) {
    if (req.isAuthenticated()) {
    var deleteGymnast = req.params.id;
    console.log('delete:', deleteGymnast);
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            var queryText = 'DELETE FROM "users" WHERE "id" = $1;';
            client.query(queryText, [deleteGymnast], function (errorMakingQuery, result) {
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

router.put('/update/:id', function (req,res){
    if (req.isAuthenticated()){
    console.log('id', req.params.id);
    console.log('body', req.body);
    var gymnast_id = req.params.id;
    var level = req.body.level;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        var queryText = 'UPDATE "gymnast_properties" SET "level" = $1 WHERE "user_id" = $2;';
        client.query(queryText, [level, gymnast_id], function (errorMakingQuery, result) {
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
