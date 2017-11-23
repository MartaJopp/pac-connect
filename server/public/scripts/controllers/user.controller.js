myApp.controller('UserController', function ($mdDialog, UserService, MessageService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.gymnasts = UserService.gymnasts;
  vm.messageService = MessageService;
  vm.allMessages = MessageService.allMessages;
 
  vm.status = '  ';
  vm.customFullscreen = false;

  vm.getGymnastList = function () { // calls getGymnast upon click of link in nav bar
    UserService.getGymnastList();
  }

  vm.getGymnastList();

vm.getMessage = function () {
  MessageService.getMessage();
}
  vm.getMessage();

vm.reply = function (conversationId) {
  MessageService.reply(conversationId);
}

vm.showAdvanced = function ($event) {
MessageService.showAdvanced($event)
}
});
