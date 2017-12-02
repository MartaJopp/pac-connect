myApp.controller('AttendanceController', function ($scope, $mdDialog, $mdToast, moment, UserService, MessageService) {
    var vm = this;
    vm.userService = UserService;
    vm.messageService = MessageService;
    vm.gymnasts = UserService.gymnasts;
    vm.attendance = UserService.attendance;

 vm.attendance = {
     gymnastId: '',
     status: '',
     date: ''
 }

 vm.attendresult = UserService.attendresult;


    // vm.choices = [
    //     { name: 'N/A', selected: false },
    //     { name: 'Present', selected: false },
    //     { name: 'Late', selected: false },
    //     { name: 'Left Early', selected: false }
    // ]

    vm.presentStatus = function (gymnastId, status, date) {
        UserService.presentStatus(gymnastId, status, date).then(function (response){
            UserService.getTeamAttendance();
        })
        
    }

    vm.save = function () {
        $mdDialog.hide()
        $mdToast.show(
            $mdToast.simple()
                .textContent('Attendance Saved!')
                .hideDelay(2500)
        );
    }

    vm.cancel = function () {
        MessageService.cancel();
    }





}) //end AttendanceController