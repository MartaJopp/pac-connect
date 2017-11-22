myApp.service('MessageService', function ($http, $location, UserService) {
    console.log('MessageService Loaded');
    var self = this;



    self.coachMessage = {
        subject: '',
        message: '',
        date: new Date()
    }

    self.allMessages = { data: [] };

    self.sendCoachMessage = function () {
        console.log('Send Message to Coach Clicked');
        console.log(self.coachMessage);
        $http.post('/message/', self.coachMessage).then(function (response) {
            console.log('response', response);
        }).catch(function (response) {
            console.log('Message to coach error.');
            self.message = "Error - please try to send message again."
        });
    };


    self.sendMessage = function () {
        console.log('Send Message from Coach Clicked')
    }

    self.getMessage = function () {
        console.log('get Messages called')
        $http.get('/message/gymnast/', ).then(function (response) {
            console.log('getGymnastMessages response', response);
            self.allMessages.data = response.data;
            console.log('threads', self.allMessages);
        })
    } // end getGymnastMessages function

})