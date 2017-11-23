myApp.controller('InfoController', function (UserService, MessageService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.userObject = UserService.userObject;
  vm.coachMessage = MessageService.coachMessage;
  vm.gymnasts = UserService.gymnasts;

  console.log('user', vm.userObject);

  vm.sendCoachMessage = function () {
    MessageService.sendCoachMessage();
  }

  vm.sendMessage = function () {
    MessageService.sendMessage();
  }

  vm.getCoachesParents = function () {
    UserService.getCoachesParents();
  }

  vm.getGymnastList = function () { 
    UserService.getGymnastList();
  }

  vm.getGymnastList(); // calls get gymnast when coach is sending new message - shows as dropdown 
  
  vm.getCoachesParents = function () { 
    UserService.getGymnastList();
  }

  vm.getCoachesParents();
});
