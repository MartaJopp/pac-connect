myApp.controller('ReplyController', function ($mdDialog, $mdToast, moment, UserService, MessageService) {
    var vm = this;
    vm.messageService = MessageService;
    vm.thisMessage = MessageService.thisMessage;
    vm.messageSubject = MessageService.messageSubject;
    vm.conversationId = MessageService.conversationId;
    vm.fromId = MessageService.fromId;
    console.log('MessageService.thisMessage', MessageService.thisMessage);


    vm.replyMessage = '\n\n-------------\n Subject: Re: ' + MessageService.thisMessage.subject + '\n From: ' + MessageService.thisMessage.from_name + '\n Date: ' + moment(MessageService.thisMessage.date).format('MMMM Do YYYY, h:mm:ss a') + '\n Message: ' + MessageService.thisMessage.message ;

    // vm.reply = function ($event, conversationId, thisMessage, messageSubject, fromId) {
    //     console.log('\n\n-------------\n' + thisMessage.message);
    //     MessageService.reply($event, conversationId, thisMessage, messageSubject, fromId);
    // }

    vm.answer = function (conversationId, messageSubject, fromId) {
        MessageService.answer(conversationId, messageSubject, fromId).then(function (response) {
            MessageService.getMessage();
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
    

})