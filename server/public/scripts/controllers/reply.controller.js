myApp.controller('ReplyController', function ($scope, $mdDialog, $mdToast, moment, UserService, MessageService) {
    var vm = this;
    vm.messageService = MessageService;
    vm.thisMessage = MessageService.thisMessage;
    vm.messageSubject = MessageService.messageSubject;
    vm.conversationId = MessageService.conversationId;
    vm.pictureUrl = MessageService.pictureUrl;
    vm.fromId = MessageService.fromId;
    vm.toId = MessageService.toId;
    vm.theReplyMessage=MessageService.theReplyMessage;
    console.log('MessageService.thisMessage', MessageService.thisMessage);


    vm.replyMessage = '\n\n\n\n\n\n-------------\n Subject: Re:' + MessageService.thisMessage.subject + '\n From: ' + MessageService.thisMessage.from_name + '\n Date: ' + moment(MessageService.thisMessage.date).format('MMMM Do YYYY, h:mm:ss a') + '\n\n Message: ' + MessageService.thisMessage.message ;

    // vm.reply = function ($event, conversationId, thisMessage, messageSubject, fromId) {
    //     console.log('\n\n-------------\n' + thisMessage.message);
    //     MessageService.reply($event, conversationId, thisMessage, messageSubject, fromId);
    // }

    vm.answer = function (conversationId, messageSubject, fromId, pictureUrl, toId) {
        MessageService.answer(conversationId, messageSubject, fromId, pictureUrl, toId).then(function (response) {
            MessageService.getMessage();
            // MessageService.getSent();
            vm.replyForm.$setPristine();
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Reply Sent!')
                    .hideDelay(2500)
            );
        })
    }

    vm.cancel = function () {
        MessageService.cancel();
    }
    
    vm.replyPicker = function () {
        MessageService.replyPicker();
    }
    vm.fsClient = filestack.init('A1JwDWLRvRvgGNT0VV1LBz');
    //file picker for reply message
    vm.replyPicker = function () {
        console.log('in reply picker')
        vm.fsClient.pick({
            fromSources: ["local_file_system"],
            accept: ["image/*", "video/*"]
        }).then(function (response) {
            // declare this function to handle response
            $scope.$apply(vm.theReplyMessage.picture.url = response.filesUploaded[0].url,
            vm.theReplyMessage.picture.filename = response.filesUploaded[0].filename)
            

        });
    }    

})