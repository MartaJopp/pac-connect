myApp.controller('EditAttendanceController', function ($scope, $mdDialog, $mdToast, moment, UserService, MessageService) {
    var vm = this;
    vm.userService = UserService;
    vm.messageService = MessageService;
    vm.gymnasts = UserService.gymnasts;
    vm.attendance = UserService.attendance;
    vm.attendresult = UserService.attendresult;
    vm.editAttId = UserService.editAttId;
    vm.name=UserService.name
    vm.attId = UserService.attId;

    vm.updatedAttendance = {
    
            attId: '',
            status: '',
            date: ''
    }


    vm.cancel = function () {
        MessageService.cancel();
    }

vm.updateAtt = function (id, status, date) {
    UserService.updateAtt(id, status, date).then(function (response){
        UserService.getTeamAttendance();
        $mdDialog.hide();
        
        $mdToast.show(
            $mdToast.simple()
                .textContent('Update Complete!')
                .hideDelay(2500)
        );

    })
    // vm.updatedAttendance.date = date
    // vm.updatedAttendance.status = status
    // vm.updatedAttendance.attId = id
    // console.log(id, status, date);
}



}) //end AttendanceController