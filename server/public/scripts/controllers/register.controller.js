myApp.controller('RegisterController', function ($http, $mdDialog, $mdToast, moment, UserService, MessageService) {
    ('RegisterController Created');
    var vm = this;
    vm.user = {
        username: '',
        password: '',
        name: '',
        user_role: '',
        profile: '',
        gym_id: '',
        coach_id: '',
        parent_id: ''
    };
    vm.message = '';
    vm.messageService = MessageService;
    vm.roles = ['coach', 'parent', 'gymnast'];
    vm.coaches = { data: [] };
    vm.parents = { data: [] };

    vm.groupSelected = function (selectedGroup, gymId) {
        console.log('selected', selectedGroup);
        console.log('gymId', gymId);
        if (selectedGroup === 'parent') {
            $http.get('/dropdown/coach/' + gymId).then(function (response) {
                console.log('LoginController -- get route -- success');
                console.log('response', response);
                console.log(response.data);
                vm.coaches = response;
                // console.log(vm.coaches);
            }).catch(function (response) {
                console.log('LoginController -- registerUser -- error');
                vm.message = "Error getting the coach dropdown"
            });
        }
        if (selectedGroup === 'gymnast') {
            $http.get('/dropdown/parent/' + gymId).then(function (response) {
                console.log('LoginController -- get route -- success');
                console.log(response);
                vm.parents = response;
            })
            $http.get('/dropdown/coach/' + gymId).then(function (response) {
                console.log('LoginController -- get route -- success');
                console.log(response);
                vm.coaches = response;
            }).catch(function (response) {
                console.log('LoginController -- registerUser -- error');
                vm.message = "Error getting the parent dropdown"
            });
        }
    }
    // start registerUser function
    vm.registerUser = function () {
        
        console.log('register clicked');
        console.log('LoginController -- registerUser');
        console.log('coach data', vm.user.coach_id);
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = "Choose a username and password!  Name cannot be left blank";
        } else {
            console.log('LoginController -- registerUser -- sending to server...', vm.user);
            $http.post('/register', vm.user).then(function (response) {
                
                console.log('response', response);
                $mdDialog.hide();
                // $location.path('/home');
              
            }).catch(function (response) {
                console.log('LoginController -- registerUser -- error');
                vm.message = "Please try again."
            });
        }
    }; // end registerUser function

    vm.closeDialog = function () {
        $mdDialog.hide()
    } //close dialog function
    vm.cancel = function () {
        $mdDialog.cancel();
    } //cancel dialog function

})