myApp.controller('InfoController', function ($mdDialog, $mdToast, UserService, MessageService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.userObject = UserService.userObject;
  vm.coachMessage = MessageService.coachMessage;
  vm.gymnasts = UserService.gymnasts;
  vm.parents = UserService.parents;

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
    UserService.getCoachesParents();
  }

  vm.getCoachesParents();

  // vm.startNewMessage = function ($event) {
  //   MessageService.startNewMessage($event)
  // }

  // vm.startCoachMessage = function ($event) {
  //   MessageService.startCoachMessage($event)
  // }

  vm.sendNewMessage = function (toId, subject, message) {
    MessageService.sendNewMessage(toId, subject, message).then(function (response){
      MessageService.getMessage();
      
      $mdToast.show(
        $mdToast.simple()
          .textContent('Message Sent!')
          .hideDelay(2500)
      );


    })
  }

  vm.cancel = function () {
    MessageService.cancel()
  }
});
