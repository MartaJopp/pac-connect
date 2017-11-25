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
    UserService.deleteGymnast(gymnastId).then(function (response){
      swal(
        'Deleted!',
        'The gymnast has been removed.',
        'success'
      )
    })
  }
  // vm.sendNewMessage = function (toId, subject, message) {
  //   MessageService.sendNewMessage(toId, subject, message)
  // }

});
