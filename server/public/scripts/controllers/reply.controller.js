myApp.controller('ReplyController', function ($mdDialog, $mdToast, moment, UserService, MessageService) {
    var vm = this;
    vm.messageService = MessageService;
    vm.thisMessage = MessageService.thisMessage;
    vm.messageSubject = MessageService.messageSubject;
    vm.conversationId = MessageService.conversationId;
    vm.pictureUrl = MessageService.pictureUrl;
    vm.fromId = MessageService.fromId;
    console.log('MessageService.thisMessage', MessageService.thisMessage);


    vm.replyMessage = '\n\n\n\n\n\n-------------\n Subject: Re:' + MessageService.thisMessage.subject + '\n From: ' + MessageService.thisMessage.from_name + '\n Date: ' + moment(MessageService.thisMessage.date).format('MMMM Do YYYY, h:mm:ss a') + '\n\n Message: ' + MessageService.thisMessage.message ;

    // vm.reply = function ($event, conversationId, thisMessage, messageSubject, fromId) {
    //     console.log('\n\n-------------\n' + thisMessage.message);
    //     MessageService.reply($event, conversationId, thisMessage, messageSubject, fromId);
    // }

    vm.answer = function (conversationId, messageSubject, fromId, pictureUrl) {
        MessageService.answer(conversationId, messageSubject, fromId, pictureUrl).then(function (response) {
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

})