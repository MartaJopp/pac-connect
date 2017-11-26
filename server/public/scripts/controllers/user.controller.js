myApp.controller('UserController', function ($mdDialog, $mdToast, UserService, MessageService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.gymnasts = UserService.gymnasts;
  vm.messageService = MessageService;
  vm.allMessages = MessageService.allMessages;
 vm.messageSubject = MessageService.messageSubject;
 vm.conversationId = MessageService.conversationId;
 vm.fromId = MessageService.fromId;
  vm.status = '';
  vm.customFullscreen = false;
  vm.updateGymnast = UserService.updateGymnast;
vm.gymnastId = UserService.gymnastId;
vm.gymnastName = UserService.gymnastName;

vm.getGymnastList = function () { // calls getGymnast upon click of link in nav bar
    UserService.getGymnastList();
  }

  vm.getGymnastList();

vm.getMessage = function () {
  MessageService.getMessage();
}
  vm.getMessage();

vm.reply = function ($event, conversationId, messageSubject, fromId) {
  MessageService.reply($event, conversationId, messageSubject, fromId);
}

vm.cancel = function () {
  MessageService.cancel();
}

  vm.answer = function (conversationId, messageSubject, fromId) {
    MessageService.answer(conversationId, messageSubject, fromId).then(function (response){
      MessageService.getMessage();
      $mdToast.show(
        $mdToast.simple()
          .textContent('Reply Sent!')
          .hideDelay(2500)
      );
    })
}

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
} 
});
