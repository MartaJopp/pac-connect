myApp.controller('InfoController', function ($mdDialog, $mdToast, UserService, MessageService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.userObject = UserService.userObject;
  vm.coachMessage = MessageService.coachMessage;
  vm.gymnasts = UserService.gymnasts;
  vm.parents = UserService.parents;
  vm.uploadShow = MessageService.uploadShow;

  console.log('user', vm.userObject);

  vm.sendCoachMessage = function () {
    MessageService.sendCoachMessage();
  }



  vm.getCoachesParents = function () {
    UserService.getCoachesParents();
  }

  vm.getGymnastList = function () { 
    UserService.getGymnastList();
  }

  // vm.getGymnastList(); // calls get gymnast when coach is sending new message - shows as dropdown 
  
  vm.getCoachesParents = function () { 
    UserService.getCoachesParents();
  }

  vm.getCoachesParents();

  vm.cancel = function () {
    MessageService.cancel()
  }
  vm.openPicker = function () {
    MessageService.openPicker();
  }

});
