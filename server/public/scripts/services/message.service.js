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
        replyTo: ''
    }

    self.messageSubject = '';
    self.conversationId = '';
    self.fromId = '';
    self.allMessages = { data: [] };

    // self.sendCoachMessage = function () {
    //     console.log('Send Message Clicked');
    //     console.log(self.coachMessage);
    //     $http.post('/message/', self.coachMessage).then(function (response) {
    //         console.log('response', response);
    //         $location.path('/user');
    //     }).catch(function (response) {
    //         console.log('Message to coach error.');
    //         self.message = "Error - please try to send message again."
    //     });
    // };

    self.startNewMessage = function ($event) {
        console.log('startNewMessage clicked');
       
        $mdDialog.show({
            controller: 'InfoController as ic',
            templateUrl: '/views/templates/coachMessage.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        })
    } // end pop up dialog/form for startNewMessage from Coach

    self.startCoachMessage = function ($event) {
        console.log('startCoachMessage clicked');

        $mdDialog.show({
            controller: 'InfoController as ic',
            templateUrl: '/views/templates/gymParentMessage.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        })
    }

    self.sendNewMessage = function (toId, subject, message) {
        console.log('Send New Message Clicked')
        console.log (toId, subject, message)
        self.closeDialog();
        self.coachMessage.subject = subject;
        self.coachMessage.message = message;
        return $http.post('/message/', self.coachMessage).then(function (response) {
            console.log('response', response);
            return response
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
    } // end getMessages function

    self.reply = function ($event, conversationId, messageSubject, fromId) {
        console.log('reply clicked');
        self.messageSubject = messageSubject;
        self.conversationId = conversationId;
        self.fromId = fromId;
        console.log('fromId in reply function', fromId)
        console.log('this is the Id', conversationId);
        $mdDialog.show({
            controller: 'UserController as uc',
            templateUrl: '/views/templates/reply.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        }) 
    } // end pop up dialog

    // send response from popup reply
    self.answer = function (replyMessage, conversationId, fromId) {
        console.log('reply', replyMessage, 'conversationId', conversationId)
   self.closeDialog(); // close the dialog box once send reply 
   self.theReplyMessage.conversation_id = conversationId;
   self.theReplyMessage.replyMessage = replyMessage;
   self.theReplyMessage.replyTo = fromId;
   var reply = self.theReplyMessage;
   console.log('the reply', self.theReplyMessage);
        return $http.post('/message/reply/', reply).then(function (response) {
            console.log('response', response);
            return response
            // self.getMessage();//send back to user home after message sent
        }).catch(function (response) {
            console.log('Reply error.');
            self.message = "Error - please try to reply to message again."
        });
    }; //end send popup reply function
    
    
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