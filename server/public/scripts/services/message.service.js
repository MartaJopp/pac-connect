myApp.service('MessageService', function ($http, $location, UserService) {
    console.log('MessageService Loaded');
    var self = this;


    self.coachMessage = {
        subject: '',
        message: '',
        to: '',
        from: '',
// for parent/gymnast I can set the to field on the server side.  I think I will be able to pull the 
// dropdown on the coach in the html form to set who it is to and then send it through here with
// data binding.  I hope.
    }

    self.allMessages = { data: [] };

    self.sendCoachMessage = function () {
        console.log('Send Message to Coach Clicked');
        console.log(self.coachMessage);
        $http.post('/message/', self.coachMessage).then(function (response) {
            console.log('response', response);
            $location.path('/user');
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