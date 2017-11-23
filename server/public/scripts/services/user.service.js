myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.gymnasts = { data: [] };
  self.parents = { data: []};

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      console.log('response', response);
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        self.userObject.user_role = response.data.user_role;
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

    self.logout = function () {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }

  self.getGymnastList = function () {
    console.log('Get gymnast')
    $http.get('/dropdown/coachesTeam/').then(function (response) {
      console.log('response', response)
      self.gymnasts.data = response.data;
    }).catch(function (response) {
      console.log('Error getting dropdown');
    });
  }

  self.getCoachesParents = function () {
    console.log('get parents called')
    $http.get('/dropdown/coachesParents/').then(function (response) {
      console.log('response', response)
      self.parents.data = response.data;
    }).catch(function (response) {
      console.log('Error getting dropdown');
    });
  }
  // this.getMessage = function () {
  //   console.log('get Messages called')
  //   $http.get('/message/gymnast/').then(function (response) {
  //     console.log('getGymnastMessages response', response);
  //   })
  // } // end getGymnastMessages function
});

