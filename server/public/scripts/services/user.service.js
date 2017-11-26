myApp.service('UserService', function ($http, $location, $mdDialog, $mdToast) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.gymnasts = { data: [] };
  self.parents = { data: [] };

  self.updateGymnast = {
    gymnast_id: '',
    level: ''
  }

  self.gymnastId = '';
  self.gymnastName = '';

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      console.log('response', response);
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        self.userObject.user_role = response.data.user_role;
        self.userObject.name = response.data.name;
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
  // delete gymnast - this deletes it as a user
  self.deleteGymnast = function (gymnastId) {
    return $http.delete('/team/delete' + gymnastId).then(function (response) {
      return response
    }).catch(function (response) {
      console.log('Error deleting gymnast');
    })
  }
  self.editGymnast = function (gymnastId, gymnastName) {
    self.gymnastName = gymnastName
    self.gymnastId = gymnastId;
    console.log('edit gymnast Id', gymnastId, gymnastName);
    console.log('edit clicked');
    $mdDialog.show({
      controller: 'UserController as uc',
      templateUrl: '/views/templates/editGymnast.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    }) //end popup edit
  } //end edit gymanst  

  self.saveEdit = function (gymnastId, level) {
    self.closeDialog(); //close the dialog once save is clicked
    self.updateGymnast.gymnast_id = gymnastId;
    self.updateGymnast.level = level;
    console.log('updated', self.updateGymnast);
    updateThisId = self.updateGymnast.gymnast_id
    

    return $http.put('/team/update/' + updateThisId, self.updateGymnast).then(function (response) {
      return response;
      console.log(response);
    })//end put route

  } //end saveEdit function


self.closeDialog = function () {
    $mdDialog.hide()
  } // end close dialog function

} //end service function 
) //end service

