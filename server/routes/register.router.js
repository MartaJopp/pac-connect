var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function(req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {
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

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    client.query("INSERT INTO users (username, password, gym_id, profile, user_role, name, coach_id, parent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [saveUser.username, saveUser.password, saveUser.gym_id, saveUser.profile, saveUser.user_role, saveUser.name, saveUser.coach_id, saveUser.parent_id],
      // client.query("INSERT INTO user_gymnast(parent_id, coach_id, gymnast_id) SELECT parent_id, coach_id, id FROM users WHERE user_role like 'gymnast';"),
    function (err, result) {
          client.end();
          if(err) {
            console.log("Error inserting data: ", err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
  });

  //GET route to populate coach/parent dropdown options
  router.get('/parent', function (req, res, next) {
console.log('req.body', req.body);
console.log('req.params.id', req.params.id);


    // pool.connect(function (err, client, done) {
    //   if (err) {
    //     console.log("Error connecting: ", err);
    //     res.sendStatus(500);
    //   }
    //   client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
    //     [saveUser.username, saveUser.password],
    //     function (err, result) {
    //       client.end();
    //            // pool +1
    //         if (errorMakingQuery) {
    //           console.log('Error making query', errorMakingQuery);
    //           res.sendStatus(500);
    //         } else {
    //           res.send(result.rows);
    //         }
    //       }); // END QUERY
        // }
  // )
});
    
});


module.exports = router;
