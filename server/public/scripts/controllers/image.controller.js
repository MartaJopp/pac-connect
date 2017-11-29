myApp.controller('ImageController', function ($mdDialog, $mdToast, UserService, MessageService) {
    console.log('ImageController created');
    var vm = this;
    vm.userService = UserService;
    vm.messageService = MessageService;
    vm.userObject = UserService.userObject;
    vm.pictureUrl = MessageService.pictureUrl;

    vm.ok = function () {
        $mdDialog.hide();
    }

    vm.cancel = function () {
        MessageService.cancel()
    }
})