myApp.controller('NewMessageController', function ($mdDialog, $mdToast, moment, UserService, MessageService) {
    var vm = this;
    vm.messageService = MessageService;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.coachMessage = MessageService.coachMessage;
    vm.gymnasts = UserService.gymnasts;
    vm.parents = UserService.parents;

    vm.closeDialog = function () {
        $mdDialog.hide()
    } //close dialog function
    vm.cancel = function () {
        $mdDialog.cancel();
    } //cancel dialog function


    vm.sendNewMessage = function (toId, subject, message) {
        MessageService.sendNewMessage(toId, subject, message).then(function (response) {
           
            MessageService.getMessage();
            vm.closeDialog();
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Message Sent!')
                    .hideDelay(2500)
            );

        })
    }

    vm.openPicker = function (){
        MessageService.openPicker();
    }

}) //end NewMessageController
