var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function (req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

router.post('/gymnastId/:id', function (req, res) {
  console.log('req.params.id', req.params.id);
  theId = req.params.id;
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'INSERT INTO "user_gymnast" ("gymnast_id") VALUES ($1);';
      db.query(queryText, [theId], function (errorMakingQuery, result) {
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
});

// Handles POST request with new user data
router.post('/', function (req, res, next) {
  console.log('req.body', req.body);
  var saveUser = {
    name: req.body.name,
    user_role: req.body.user_role,
    profile: req.body.profile,
    gym_id: req.body.gym_id,
    username: req.body.username,
    coach_id: parseInt(req.body.coach_id),
    parent_id: parseInt(req.body.parent_id),
    password: encryptLib.encryptPassword(req.body.password)
  };
  console.log('new user as sent:', saveUser);

  if (saveUser.user_role === 'coach') {
    saveUser.coach_id = 0,
      saveUser.parent_id = 0
  }

  if (saveUser.user_role === 'parent') {
    saveUser.parent_id = 0
  }

  console.log('newUser with id changes:', saveUser)

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    client.query("INSERT INTO users (username, password, gym_id, profile, user_role, name, coach_id, parent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, coach_id, parent_id",
      [saveUser.username, saveUser.password, saveUser.gym_id, saveUser.profile, saveUser.user_role, saveUser.name, saveUser.coach_id, saveUser.parent_id],
      // client.query("INSERT INTO user_gymnast(parent_id, coach_id, gymnast_id) SELECT parent_id, coach_id, id FROM users WHERE user_role like 'gymnast';"),  
      function (err, result) {
        // client.end();
        if (err) {
          console.log("Error inserting data: ", err);
          res.sendStatus(500);
        } else {
          console.log('result after registering', result);
          // res.sendStatus(201);
          if (saveUser.user_role === 'gymnast') {

            // res.send(result.rows);
            console.log('result.rows', result.rows[0].id, result.rows[0].coach_id, result.rows[0].parent_id);
            var gymnastId = result.rows[0].id;
            var coachId = result.rows[0].coach_id;
            var parentId = result.rows[0].parent_id;
            client.query("INSERT INTO user_gymnast (gymnast_id, coach_id, parent_id) VALUES ($1, $2, $3) returning gymnast_id;",
              [gymnastId, coachId, parentId]);


            // var level = 0;
            // client.query("INSERT INTO gymnast_properties (user_id, level) VALUES ($1, $2);",
            //   [gymnastId, level])
          }


          else {
            res.sendStatus(201);
          }
        }
      }
    )
  });
}) // new user post

module.exports = router;
