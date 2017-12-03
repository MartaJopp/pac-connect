myApp.controller('EditAttendanceController', function ($scope, $mdDialog, $mdToast, moment, UserService, MessageService) {
    var vm = this;
    vm.userService = UserService;
    vm.messageService = MessageService;
    vm.gymnasts = UserService.gymnasts;
    vm.attendance = UserService.attendance;
    vm.attendresult = UserService.attendresult;




    vm.cancel = function () {
        MessageService.cancel();
    }

vm.updateAtt = function (id, status, date) {
    console.log(id);
}



}) //end AttendanceController