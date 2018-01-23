myApp.controller('LoginController', function ($http, $mdDialog, $location, UserService, MessageService) {
  console.log('LoginController created');
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

  vm.login = function () {
    console.log('LoginController -- login');
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username and password!";
    } else {
      console.log('LoginController -- login -- sending to server...', vm.user);
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          MessageService.getMessage();
          console.log(' the IF login LoginController -- login -- success: ', response.data);
          // location works with SPA (ng-route)

          $location.path('/user'); // http://localhost:5000/#/user
        } else {
          console.log('LoginController -- login -- failure: ', response);
          vm.message = "Wrong!!";
        }
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- failure: ', response);
        vm.message = "Wrong!!";
      });
    }
  };


  //shows specific form inputs depending on selected group
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
        vm.thisId = response.data[0].id; //this is the id of the person just registered

        if (vm.thisId == undefined) {
          console.log('response is undefined')
          console.log('LoginController -- registerUser -- success');
          $location.path('/home');
        }
        else {
          console.log('response to register user', response.data[0].id);
          console.log('id', vm.thisId);
          vm.sendGymnast(vm.thisId);
        }
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- error');
        vm.message = "Please try again."
      });
    }
  };

  //slideshow 
  vm.arrayData = [
    { src: 'images/mom.jpg' },
    { src: 'images/chalk.jpg' },
    { src: 'images/coach.jpg' },
    { src: 'images/smaller logo.png' }
  ]

  vm.register = function (event) {
    console.log('register clicked')

    $mdDialog.show({
      controller: 'RegisterController as reg',
      templateUrl: '/views/templates/aregister.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    })
  }


});
