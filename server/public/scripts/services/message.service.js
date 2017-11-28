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
        }
        // for parent/gymnast I can set the to field on the server side.  I think I will be able to pull the 
        // dropdown on the coach in the html form to set who it is to and then send it through here with
        // data binding.  I hope.
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
    self.thisMessage = '';
    self.allMessages = { data: [] };
    self.sentMessages = {data: []};

    self.athleteCoachMessages = { data: [] };
self.selected_item = null;

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
    } //start new message to coach from parent/gymnast

    self.sendNewMessage = function (toId, subject, message) {
        console.log('Send New Message Clicked')
        console.log(toId, subject, message)
        self.coachMessage.subject = subject;
        self.coachMessage.message = message;
        return $http.post('/message/', self.coachMessage).then(function (response) {
            console.log('response', response);
            self.closeDialog();

            return response
            self.getMessage();
        }).catch(function (response) {
            console.log('Message to coach error.');
            self.message = "Error - please try to send message again."
        });
    }; //send message from the popup


    self.getMessage = function () {

        console.log('get Messages called')
        $http.get('/message/gymnast/').then(function (response) {
            console.log('getGymnastMessages response', response);
            self.allMessages.data = response.data;
            console.log('inbox', response.data)
            console.log('threads', self.allMessages);
        })
    } // end getMessages function

    self.getSent = function () {
        console.log('get sent called');
        $http.get('/message/sent/').then(function (response){
            console.log('sent', response.data)
            self.sentMessages.data = response.data;
        })
    }

    self.reply = function ($event, conversationId, thisMessage, messageSubject, fromId) {
        console.log('reply clicked');
        self.messageSubject = messageSubject;
        self.conversationId = conversationId;
        self.fromId = fromId;
        self.thisMessage = thisMessage;
        console.log('fromId in reply function', fromId)
        console.log('this is the Id', conversationId);
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
    self.answer = function (replyMessage, conversationId, fromId, pictureUrl) {
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
    } //close dialog function
    self.cancel = function () {
        $mdDialog.cancel();
    } //cancel dialog function

    self.getAthleteCoachMessages = function () {
        console.log('getting all of the messages')
        $http.get('/message/athCoach').then(function (response) {
            console.log('response', response);
            self.athleteCoachMessages.data = response.data;
        }).catch(function (response) {
            console.log('Error getting messages.');
            self.message = "Error - please try to send message again."
        });
    };      // end get messages betweeen athlete and coach

    

    self.fsClient = filestack.init('A1JwDWLRvRvgGNT0VV1LBz');
    self.openPicker = function () {
        console.log(self.uploadShow);
        self.fsClient.pick({
            fromSources: ["local_file_system"],
            accept: ["image/*", "video/*"]
        }).then(function (response) {
            // declare this function to handle response
            $mdToast.show(
                $mdToast.simple()
                    .textContent('File uploaded!')
                    .hideDelay(2500)
            );
            console.log('this is the picture', response.filesUploaded[0])
            self.coachMessage.picture.url = response.filesUploaded[0].url;
            self.coachMessage.picture.filename = response.filesUploaded[0].filename;
            console.log('what does this say?', self.coachMessage.picture.url);
            self.uploadShow = true;
            console.log(self.uploadShow);
        });
    }
    // self.replyClient = filestack.init('A1JwDWLRvRvgGNT0VV1LBz');

    //file picker for reply message
    self.replyPicker = function () {
        console.log('in reply picker')
        self.fsClient.pick({
            fromSources: ["local_file_system"],
            accept: ["image/*", "video/*"]
        }).then(function (response) {
            // declare this function to handle response
            $mdToast.show(
                $mdToast.simple()
                    .textContent('File uploaded!')
                    .hideDelay(2500)
            );
            console.log('this is the picture', response.filesUploaded[0])
            self.theReplyMessage.picture.url = response.filesUploaded[0].url;
            self.theReplyMessage.picture.filename = response.filesUploaded[0].filename;
            console.log('what does this say?', self.theReplyMessage.picture.url);
           
        });
    }

    // self.setItem = function (i) {
    //     console.log('clicked');
    //     console.log('i', i);
    //     self.selected_item = i;
    // }

})