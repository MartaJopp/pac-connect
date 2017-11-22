myApp.service('MessageService', function ($http, $location, UserService) {
    console.log('MessageService Loaded');
    var self = this;



    this.coachMessage = {
        subject: '',
        message: '',
        date: new Date()
    }

    this.sendCoachMessage = function () {
        console.log('Send Message Clicked');
        console.log(this.coachMessage);
        $http.post('/message/', this.coachMessage).then(function (response) {
            console.log('response', response);
        }).catch(function (response) {
            console.log('Message to coach error.');
            this.message = "Error - please try to send message again."
        });
    };


    this.sendMessage = function () {

    }
})