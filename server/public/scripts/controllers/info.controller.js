myApp.controller('InfoController', function (UserService, MessageService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.userObject = UserService.userObject;
  vm.coachMessage = MessageService.coachMessage;

  vm.userObject.coach_id = MessageService.userObject.coach_id

  console.log('user', vm.userObject);

  vm.sendCoachMessage = function () {
    MessageService.sendCoachMessage();
  }

  vm.sendMessage = function () {
    MessageService.sendMessage();
  }


});
