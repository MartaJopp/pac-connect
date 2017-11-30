myApp.controller('AttendanceController', function ($scope, $mdDialog, $mdToast, moment, UserService, MessageService) {
    var vm = this;
    vm.userService = UserService;
    vm.messageService = MessageService;
    vm.gymnasts = UserService.gymnasts;

vm.attendanceStatus = 
    {
        gymnast_id: '',
        status: '',
        date: '',
    }

    vm.choices = [
        { name: 'N/A', selected: false },
        { name: 'Present', selected: false },
        { name: 'Late', selected: false },
        { name: 'Left Early', selected: false }
    ];

    vm.selection = {
    
    };

    vm.choices = [{ "name": "N/A", "id": "1" }, { "name": "Present", "id": "2" }, { "name": "Absent", "id": "3" }, { "name": "Late", "id": "4" }, { "name": "Left Early", "id": "5" } ];

// vm.choices = ['N/A', 'Present', 'Late', 'Left Early'];

vm.sendAttendance = function () {


    // console.log (vm.attendance)
    // console.log(vm.attendance.data.gymnast_id);

}

}) //end AttendanceController