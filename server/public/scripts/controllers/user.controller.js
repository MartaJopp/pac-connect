myApp.controller('UserController', function ($mdDialog, $mdToast, moment, UserService, MessageService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.gymnasts = UserService.gymnasts;
  vm.messageService = MessageService;
  vm.allMessages = MessageService.allMessages;
  vm.sentMessages = MessageService.sentMessages;
  vm.attendresult = UserService.attendresult;
  vm.dates = UserService.dates;
  vm.gymnastAttendance = UserService.gymnastAttendance;
  vm.childAttendance = UserService.childAttendance;
  vm.status = '';
  vm.customFullscreen = false;
  vm.updateGymnast = UserService.updateGymnast;
  vm.gymnastId = UserService.gymnastId;
  vm.gymnastName = UserService.gymnastName;
  vm.athleteCoachMessages = MessageService.athleteCoachMessages;
  vm.selected_item = null;
  vm.sentSelected_item = null;
  vm.getTeamAttendance = UserService.getTeamAttendance.data;

  vm.getGymnastList = function () { // calls getGymnast upon click of link in nav bar
    UserService.getGymnastList();
  }

  vm.getGymnastList();



  vm.getMessage = function () {
    MessageService.getMessage();
  }


  vm.reply = function ($event, conversationId, thisMessage, messageSubject, fromId, toId) {
    MessageService.reply($event, conversationId, thisMessage, messageSubject, fromId, toId);
  }

  vm.cancel = function () {
    MessageService.cancel();
  }

  vm.startNewMessage = function ($event) {
    UserService.getCoachesParents();
    MessageService.startNewMessage($event)
  }

  vm.startCoachMessage = function ($event) {
    MessageService.startCoachMessage($event)
  }

  vm.deleteGymnast = function (gymnastId) {
    console.log('delete', gymnastId)
    var toast = $mdToast.simple()
      .textContent('Are you sure you want to delete?')
      .action('Cancel')
      .highlightAction(true)
      .highlightClass('md-accent');

    $mdToast.show(toast).then(function (response) {
      if (response == 'ok') {
        // alert ('Delete cancelled.')
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Cancel!')
            .textContent('You cancelled removing the gymnast.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Thanks')
            .targetEvent(event)
        );
      }
      else {
        UserService.deleteGymnast(gymnastId).then(function (response) {

          UserService.getGymnastList();

          $mdToast.show(
            $mdToast.simple()
              .textContent('Gymnast Deleted!')
              .hideDelay(2500)
          );

        })

      }
    } //  
    ) // 
  } //end delete gymnast function 

  vm.editGymnast = function (gymnastId, gymnastName) {
    UserService.editGymnast(gymnastId, gymnastName)
  } //end editGymnast Function

  //save changes to team
  vm.saveEdit = function (gymnastId, level) {
    UserService.saveEdit(gymnastId, level).then(function (response) {

      UserService.getGymnastList();

      $mdToast.show(
        $mdToast.simple()
          .textContent('Update Complete!')
          .hideDelay(2500)
      );
    }
    )
  } // end saveEdit function

  //gets messages between the athlete and the coach
  vm.getAthleteCoachMessages = function () {
    MessageService.getAthleteCoachMessages();
  }
  vm.getAthleteCoachMessages();

  //shows messages when clicked
  vm.setItem = function (i) {
    console.log('clicked')
    if (vm.selected_item === i) {
      vm.selected_item = null;
    }
    else {
      vm.selected_item = i;
    }
  }
  //shows sent messages when clicked
  vm.sentSetItem = function (i) {

    if (vm.sentSelected_item === i) {
      vm.sentSelected_item = null;
    }
    else {
      vm.sentSelected_item = i;
    }
  }
  //get sent messages
  vm.getSent = function () {
    MessageService.getSent();
  }
  vm.getSent();
  vm.getMessage();

  //displays image as a pop up
  vm.clickImage = function (event, pictureUrl) {
    MessageService.clickImage(event, pictureUrl)
  }
  //if message has been clicked - shows as read
  vm.messageRead = function (messageId) {

    MessageService.messageRead(messageId).then(function (response) {
      vm.getMessage();
      vm.getSent();
    })
  }
  //if parent has read the message between coach and athlete shows as read
  vm.parentRead = function (messageId) {

    MessageService.parentRead(messageId).then(function (response) {
      vm.getAthleteCoachMessages();
    })
  }

  //attendance
  vm.attendance = function ($event) {
    MessageService.attendance(event)
  }

  //gets the team's attendance
  vm.getTeamAttendance = function () {
    UserService.getTeamAttendance();

  } //end getTeamAttendance for coach
  vm.getTeamAttendance();

  vm.getDates = function () {
    UserService.getDates()
  }

  //eidt attendance
  vm.editAtt = function (id, name, status, date) {
    UserService.editAtt(id, name, status, date)

  }

  //delete attendance
  vm.deleteAtt = function (attId) {
    console.log('delete', attId)
    var toast = $mdToast.simple()
      .textContent('Are you sure you want to delete?')
      .action('Cancel')
      .highlightAction(true)
      .highlightClass('md-accent');

    $mdToast.show(toast).then(function (response) {
      if (response == 'ok') {
        // alert ('Delete cancelled.')
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Cancel!')
            .textContent('You cancelled deleting the attendance record.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Thanks')
            .targetEvent(event)
        );
      }
      else {
        UserService.deleteAtt(attId).then(function (response) {

          UserService.getTeamAttendance();

          $mdToast.show(
            $mdToast.simple()
              .textContent('Attendance record deleted!')
              .hideDelay(2500)
          );

        })

      }
    } //   
    ) // }
  } //end delete attendance record  


  //attendance for gymnast
  vm.getPersonalAttendance = function () {
    UserService.getPersonalAttendance().then(function (response) {

    })
  }

  UserService.getPersonalAttendance();
  //child's attendance for parent
  vm.getChildAttendance = function () {
    UserService.getChildAttendance().then(function (response) {

    })
  }

  UserService.getChildAttendance();
})//end user controller

