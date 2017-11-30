myApp.controller('UserController', function ($mdDialog, $mdToast, moment, UserService, MessageService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.gymnasts = UserService.gymnasts;
  vm.messageService = MessageService;
  vm.allMessages = MessageService.allMessages;
  vm.sentMessages = MessageService.sentMessages;
//  vm.messageSubject = MessageService.messageSubject;
//  vm.conversationId = MessageService.conversationId;
//  vm.fromId = MessageService.fromId;
  vm.status = '';
  vm.customFullscreen = false;
  vm.updateGymnast = UserService.updateGymnast;
vm.gymnastId = UserService.gymnastId;
vm.gymnastName = UserService.gymnastName;
vm.athleteCoachMessages = MessageService.athleteCoachMessages;
vm.selected_item = null;
  vm.sentSelected_item = null;
// vm.thisMessage = MessageService.thisMessage;
//   console.log('MessageService.thisMessage', MessageService.thisMessage);


//   vm.replyMessage = '\n\n-------------\n' + MessageService.thisMessage.message;

vm.getGymnastList = function () { // calls getGymnast upon click of link in nav bar
    UserService.getGymnastList();
  }

  vm.getGymnastList();

vm.getMessage = function () {
  MessageService.getMessage();
}
  

vm.reply = function ($event, conversationId, thisMessage, messageSubject, fromId) {
  // console.log('\n\n-------------\n' + thisMessage.message);
  MessageService.reply($event, conversationId, thisMessage, messageSubject, fromId);
}

vm.cancel = function () {
  MessageService.cancel();
}

//   vm.answer = function (conversationId, messageSubject, fromId) {
//     MessageService.answer(conversationId, messageSubject, fromId).then(function (response){
//       MessageService.getMessage();
//       $mdToast.show(
//         $mdToast.simple()
//           .textContent('Reply Sent!')
//           .hideDelay(2500)
//       );
//     })
// }

  vm.startNewMessage = function ($event) {
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
    UserService.deleteGymnast(gymnastId).then(function (response){
    
      UserService.getGymnastList();

      $mdToast.show(
        $mdToast.simple()
          .textContent('Gymnast Deleted!')
          .hideDelay(2500)
      );
      
    })
  
  }
 // vm.sendNewMessage = function (toId, subject, message) {
 } //   MessageService.sendNewMessage(toId, subject, message)
 ) // }
  } //end delete gymnast function 

  vm.editGymnast = function (gymnastId, gymnastName)  {
    UserService.editGymnast(gymnastId, gymnastName) 
  } //end editGymnast Function

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

vm.getAthleteCoachMessages = function() {
  MessageService.getAthleteCoachMessages();
}
vm.getAthleteCoachMessages();

// vm.openPicker = function (){
//   MessageService.openPicker();
// }
vm.setItem = function(i){
  console.log('clicked')
  if (vm.selected_item === i) {
    vm.selected_item = null;
  }
  else {
    vm.selected_item = i;  
}
}

  vm.sentSetItem = function (i) {
    
    if (vm.sentSelected_item === i) {
      vm.sentSelected_item = null;
    }
    else {
      vm.sentSelected_item = i;
    }
  }

  vm.getSent = function () {
    MessageService.getSent();
  }
  vm.getSent();
  vm.getMessage();

  vm.clickImage = function(event, pictureUrl) {
    MessageService.clickImage(event, pictureUrl)
  }

  vm.messageRead = function (messageId) {
  
    MessageService.messageRead(messageId).then(function(response){
      vm.getMessage();
      vm.getSent();
    })
}

  vm.parentRead = function (messageId) {

    MessageService.parentRead(messageId).then(function(response){
      vm.getAthleteCoachMessages();
    })
  }

})//end user controller

