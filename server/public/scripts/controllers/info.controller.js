myApp.controller('InfoController', function(UserService, MessageService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.userObject = UserService.userObject;

  
console.log('user', vm.userObject);

});
