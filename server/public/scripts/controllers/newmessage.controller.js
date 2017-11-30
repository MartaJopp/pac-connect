myApp.controller('NewMessageController', function ($scope, $mdDialog, $mdToast, moment, UserService, MessageService) {
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
            vm.coachMessage.message = '';
            vm.coachMessage.to_id = '';
            vm.coachMessage.subject = '';
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Message Sent!')
                    .hideDelay(2500)
            );

        })
    }

    // vm.openPicker = function (){
    //     MessageService.openPicker();
    // }

    vm.fsClient = filestack.init('A1JwDWLRvRvgGNT0VV1LBz');
    vm.openPicker = function () {
        console.log(vm.uploadShow);
        vm.fsClient.pick({
            fromSources: ["local_file_system"],
            accept: ["image/*", "video/*"]
        }).then(function (response) {
            // declare this function to handle response
            $scope.$apply(vm.coachMessage.picture.url = response.filesUploaded[0].url,
            vm.coachMessage.picture.filename = response.filesUploaded[0].filename);
            // $mdToast.show(
            //     $mdToast.simple()
            //         .textContent('File uploaded!')
            //         .hideDelay(2500)
            // );
            console.log('this is the picture', response.filesUploaded[0])
            // vm.coachMessage.picture.url = response.filesUploaded[0].url;
            // vm.coachMessage.picture.filename = response.filesUploaded[0].filename;
            // console.log('what does this say?', self.coachMessage.picture.url);
            vm.uploadShow = true;
            console.log(vm.uploadShow);
        });
    }

}) //end NewMessageController
