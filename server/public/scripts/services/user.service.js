myApp.service('UserService', function ($http, $location, $mdDialog, $mdToast) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.gymnasts = { data: [] };
  self.parents = { data: [] };
  self.dates = { data: [] };
  self.attId = '';
  self.gymnastAttendance = { data: [] };
  self.childAttendance = { data: [] };

  self.updateGymnast = {
    gymnast_id: '',
    level: ''
  }

  self.attendance = {
    gymnastId: '',
    status: '',
    date: ''
  }

  self.attendresult = {
    data: []
  }

  self.gymnastId = '';
  self.gymnastName = '';

  self.updatedAttendance = {
    date: '',
    status: ''
  }

  self.name = '';
  self.attId = '';

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
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

  //get list of gymnasts attributed to specific coach
  self.getGymnastList = function () {
    $http.get('/dropdown/coachesTeam/').then(function (response) {
      self.gymnasts.data = response.data;
    }).catch(function (response) {
      console.log('Error getting dropdown');
    });
  } //end get gymnast
  //get list of coaches attributed to specific coach and gym
  self.getCoachesParents = function () {
    console.log('get parents called')
    $http.get('/dropdown/coachesParents/').then(function (response) {
      console.log('response', response)
      self.parents.data = response.data;
    }).catch(function (response) {
      console.log('Error getting dropdown');
    });
  } //end get parent
  // delete gymnast - this deletes it as a user
  self.deleteGymnast = function (gymnastId) {
    return $http.delete('/team/delete' + gymnastId).then(function (response) {
      return response
    }).catch(function (response) {
      console.log('Error deleting gymnast');
    })
  } //end delete gymnast

  //edit gymnast popup
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

  //update gymnast information
  self.saveEdit = function (gymnastId, level) {
    self.closeDialog(); //close the dialog once save is clicked
    self.updateGymnast.gymnast_id = gymnastId;
    self.updateGymnast.level = level;
    updateThisId = self.updateGymnast.gymnast_id

    return $http.put('/team/update/' + updateThisId, self.updateGymnast).then(function (response) {
      return response;

    })//end put route

  } //end saveEdit function


  self.closeDialog = function () {
    $mdDialog.hide()
  } // end close dialog function

  //gets team attendance for coach view
  self.getTeamAttendance = function () {
    $http.get('/attendance').then(function (response) {
      self.attendresult.data = response.data
      self.getDates();
    }).catch(function (response) {
      console.log('error');
    })
  }//end team attendance for coach view

  //post route for gymnast attendance
  self.presentStatus = function (gymnastId, status, date) {
    self.attendance.gymnastId = gymnastId;
    self.attendance.status = status;
    self.attendance.date = date
    return $http.post('/attendance/', self.attendance).then(function (response) {
      return response
    }).catch(function (response) {
      console.log('error received')
    })
  }//end post gymnast attendance

  //gets attendance for specific dates
  self.getDates = function () {
    $http.get('/attendance/dates/').then(function (response) {
      self.dates.data = response.data;
    }).catch(function (response) {
      console.log('Error received getting dates')
    })
  }//end attendance for dates

  //edit attendance popup
  self.editAtt = function (id, name, status, date) {
    self.name = name;
    self.attId = id;
    $mdDialog.show({
      controller: 'EditAttendanceController as ea',
      templateUrl: '/views/templates/editAttendance.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    }) //end popup edit
  } //end edit gymanst  

  //edit an attendance record
  self.updateAtt = function (id, date, status) {
    self.attId = id;
    self.updatedAttendance.status = status;
    self.updatedAttendance.date = date;
    return $http.put('/attendance/' + self.attId, self.updatedAttendance).then(function (response) {
      return response;
    })
  }//end attendance record


  //gets the gymnast's attendance
  self.getPersonalAttendance = function () {
    return $http.get('/attendance/gymnastAtt/').then(function (response) {
      self.gymnastAttendance.data = response.data;
      return response
    }).catch(function (response) {
      console.log('Error received getting attendance.')
    })
  } // end get attendance for gymnast view

  //gets the parent's child's attendance
  self.getChildAttendance = function () {
    return $http.get('/attendance/childAtt/').then(function (response) {
      self.childAttendance.data = response.data;
      return response
    }).catch(function (response) {
      console.log('Error received getting attendance.')
    })
  } // end getChildAttendance for parent view

  //delete a specific attendance record
  self.deleteAtt = function (attId) {
    return $http.delete('/attendance/delete' + attId).then(function (response) {
      return response
    }).catch(function (response) {
      console.log('Error deleting gymnast');
    })
  } //end delete attendance record

} //end service function 
) //end service

