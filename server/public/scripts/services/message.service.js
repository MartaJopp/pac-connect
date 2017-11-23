myApp.service('MessageService', function ($http, $location, $mdDialog, UserService) {
    console.log('MessageService Loaded');
    var self = this;

    

    self.coachMessage = {
        subject: '',
        message: '',
        to_id: '',
        from_id: '',
        from_name: ''
// for parent/gymnast I can set the to field on the server side.  I think I will be able to pull the 
// dropdown on the coach in the html form to set who it is to and then send it through here with
// data binding.  I hope.
    }

    self.theReplyMessage = {
        conversation_id: '',
        replyMessage: '',
    }
    self.messageSubject = '';
    self.conversationId = '';
    self.allMessages = { data: [] };

    self.sendCoachMessage = function () {
        console.log('Send Message Clicked');
        console.log(self.coachMessage);
        $http.post('/message/', self.coachMessage).then(function (response) {
            console.log('response', response);
            $location.path('/user');
        }).catch(function (response) {
            console.log('Message to coach error.');
            self.message = "Error - please try to send message again."
        });
    };


    // self.sendMessage = function () {
    //     console.log('Send Message from Coach Clicked')
    //     console.log('this is the message', self.coachMessage);
    //     $http.post('/message/', self.coachMessage)
    // }

    self.getMessage = function () {
        console.log('get Messages called')
        $http.get('/message/gymnast/', ).then(function (response) {
            console.log('getGymnastMessages response', response);
            self.allMessages.data = response.data;
            console.log('threads', self.allMessages);
        })
    } // end getGymnastMessages function

    self.reply = function ($event, conversationId, messageSubject) {
        console.log('reply clicked');
        self.messageSubject = messageSubject;
        self.conversationId = conversationId;
        console.log('this is the Id', conversationId);
        $mdDialog.show({
            controller: 'UserController as uc',
            templateUrl: '/views/templates/reply.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        }) 
    }

    self.answer = function (replyMessage, conversationId) {
        console.log('reply', replyMessage, 'conversationId', conversationId)
   self.closeDialog(); // close the dialog box
   self.theReplyMessage.conversation_id = conversationId;
   self.theReplyMessage.replyMessage = replyMessage;
        $http('/message/reply/', self.theReplyMessage).then(function (response) {
            console.log('response', response);
            $location.path('/user');
        }).catch(function (response) {
            console.log('Reply error.');
            self.message = "Error - please try to reply to message again."
        });
    };
    
    
    self.closeDialog = function () {
        $mdDialog.hide()
    }
    self.cancel = function() {
        $mdDialog.cancel();
    }
    // self.showAdvanced = function ($event) {
    //     console.log('showAdvanced clicked'); 
    //     $mdDialog.show({
    //         controller: 'UserController as uc',
    //         templateUrl: '/views/templates/reply.html',
    //         parent: angular.element(document.body),
    //         targetEvent: $event,
    //         clickOutsideToClose: true,
    //         fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    //     })
    //         .then(function (answer) {
    //             self.status = 'You said the information was "' + answer + '".';
    //         }, function () {
    //             self.status = 'You cancelled the dialog.';
    //         });
    // }

})