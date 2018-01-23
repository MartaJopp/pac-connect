myApp.service('MessageService', function ($http, $location, $mdDialog, $mdToast, UserService) {
    console.log('MessageService Loaded');
    var self = this;

    self.coachMessage = {
        subject: '',
        message: '',
        to_id: '',
        from_id: '',
        from_name: '',
        picture: {
            url: '',
            filename: ''
        },
        read: '',
        parentRead: ''
        // for parent/gymnast I can set the to field on the server side.  
    }


    self.theReplyMessage = {
        conversation_id: '',
        replyMessage: '',
        replyTo: '',
        picture: {
            url: '',
            filename: ''
        }
    }

    self.messageSubject = '';
    self.conversationId = '';
    self.fromId = '';
    self.toId = '';
    self.thisMessage = '';
    self.allMessages = { data: [] };
    self.sentMessages = { data: [] };

    self.athleteCoachMessages = { data: [] };
    self.selected_item = null;

    //new message popup from coach
    self.startNewMessage = function ($event) {
        $mdDialog.show({
            controller: 'NewMessageController as nm',
            templateUrl: '/views/templates/coachMessage.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        })
    } // end pop up dialog/form for startNewMessage from Coach

    //new message popup to coach
    self.startCoachMessage = function ($event) {
        $mdDialog.show({
            controller: 'NewMessageController as nm',
            templateUrl: '/views/templates/gymParentMessage.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        })
    } //start new message to coach from parent/gymnast

    //send New message
    self.sendNewMessage = function (toId, subject, message) {

        self.coachMessage.subject = subject;
        self.coachMessage.message = message;
        return $http.post('/message/', self.coachMessage).then(function (response) {
            console.log('response', response);
            return response
            self.getMessage();
        }).catch(function (response) {
            console.log('Message to coach error.');
            self.message = "Error - please try to send message again."
        });
    }; //send message from the popup

    //get messages for athlete
    self.getMessage = function () {
        $http.get('/message/gymnast/').then(function (response) {
            self.allMessages.data = response.data;
            self.getSent();
        })
    } // end getMessages function

    //get sent messages
    self.getSent = function () {
        $http.get('/message/sent/').then(function (response) {
            self.sentMessages.data = response.data;
        })
    }

    //reply popup
    self.reply = function ($event, conversationId, thisMessage, messageSubject, fromId, toId) {
        self.messageSubject = messageSubject;
        self.conversationId = conversationId;
        self.fromId = fromId;
        self.thisMessage = thisMessage;
        self.toId = toId
        $mdDialog.show({
            controller: 'ReplyController as rc',
            templateUrl: '/views/templates/reply.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        })
    } // end pop up dialog

    // send response from popup reply
    self.answer = function (replyMessage, conversationId, fromId, pictureUrl, toId) {
        self.closeDialog(); // close the dialog box once send reply 
        self.theReplyMessage.conversation_id = conversationId;
        self.theReplyMessage.replyMessage = replyMessage;
        self.theReplyMessage.replyFrom = fromId;
        self.theReplyMessage.replyTo = toId;
        var reply = self.theReplyMessage;
        return $http.post('/message/reply/', reply).then(function (response) {
            return response
        }).catch(function (response) {
            console.log('Reply error.');
            self.message = "Error - please try to reply to message again."
        });
    }; //end send popup reply function


    self.closeDialog = function () {
        $mdDialog.hide()
    } //close dialog function
    self.cancel = function () {
        $mdDialog.cancel();
    } //cancel dialog function

    self.getAthleteCoachMessages = function () {
        $http.get('/message/athCoach').then(function (response) {
            self.athleteCoachMessages.data = response.data;
        }).catch(function (response) {
            console.log('Error getting messages.');
            self.message = "Error - please try to send message again."
        });
    };      // end get messages betweeen athlete and coach

    self.pictureUrl = ''
    self.clickImage = function (event, pictureUrl) {
        self.pictureUrl = pictureUrl
        $mdDialog.show({
            controller: 'ImageController as img',
            templateUrl: '/views/templates/image.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        })
    } // end pop up dialog

    self.messageRead = function (messageId) {
        return $http.put('/message/read/' + messageId).then(function (response) {
            return response
        }).catch(function (response) {
            console.log('Error updating messages.');
        });
    } //end messageRead

    self.parentRead = function (messageId) {
        return $http.put('/message/parentRead/' + messageId).then(function (response) {
            return response
        }).catch(function (response) {
            console.log('Error updating.');
        })
    }//end parentRead
    // end clickImage

    //attendance popup
    self.attendance = function (event) {
        $mdDialog.show({
            controller: 'AttendanceController as ac',
            templateUrl: '/views/templates/attendance.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        })
    }//end attendance popup

})
