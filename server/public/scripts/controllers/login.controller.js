myApp.controller('LoginController', function ($http, $location, UserService) {
  console.log('LoginController created');
  var vm = this;
  vm.user = {
    username: '',
    password: '',
    name: '',
    user_role: '',
    profile: '',
    gym_id: ''
  };
  vm.message = '';

  vm.roles = ['coach', 'parent', 'gymnast'];
  vm.coaches = {data: []};
  vm.parents = {data: []};

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
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- error');
        vm.message = "Error getting the parent dropdown"
      });
    }
    }
  

  // vm.registerStep1 = function () {
  //   console.log('button clicked');
  //   var theRole = vm.user.user_role;
  //   var gymId = vm.user.gym_id;
  //   console.log('what is your role?', vm.user.user_role);
  //   console.log('what is your gym id?', vm.user.gym_id);
  //   if (theRole === 'coach') {
  //     theRole = vm.user.user_role;
  //     gymId = vm.user.gym_id
  //     vm.registerCoach(theRole, gymId);
  //   }
  //   if (theRole === 'parent') {
  //     console.log('I am a parent?', theRole);
  //     $http.get('/dropdown/coach/' + gymId).then(function (response) {
  //       console.log('LoginController -- get route -- success');
  //       console.log(response);
  //       vm.registerParent(gymId, response);
  //     }).catch(function (response) {
  //       console.log('LoginController -- registerUser -- error');
  //       vm.message = "Error getting the coach dropdown"
  //     });
  //   }
  //   if (theRole === 'gymnast') {
  //     console.log('I am a gymnast?', theRole)
  //     $http.get('/dropdown/parent/' + gymId).then(function (response) {
  //       console.log('LoginController -- get route -- success');
  //       console.log(response);
  //       vm.registerGymnast(gymId, response);
  //     }).catch(function (response) {
  //       console.log('LoginController -- registerUser -- error');
  //       vm.message = "Error getting the parent dropdown"
  //     });
  //   }
  // }


  // vm.login = function () {
  //   console.log('LoginController -- login');
  //   if (vm.user.username === '' || vm.user.password === '') {
  //     vm.message = "Enter your username and password!";
  //   } else {
  //     console.log('LoginController -- login -- sending to server...', vm.user);
  //     $http.post('/', vm.user).then(function (response) {
  //       if (response.data.username) {
  //         console.log('LoginController -- login -- success: ', response.data);
  //         // location works with SPA (ng-route)
  //         $location.path('/user'); // http://localhost:5000/#/user
  //       } else {
  //         console.log('LoginController -- login -- failure: ', response);
  //         vm.message = "Wrong!!";
  //       }
  //     }).catch(function (response) {
  //       console.log('LoginController -- registerUser -- failure: ', response);
  //       vm.message = "Wrong!!";
  //     });
  //   }
  // };
  // start registerUser function
  vm.registerUser = function () {
    console.log('register clicked');
    console.log('LoginController -- registerUser');
    
    if (vm.user.username === '' || vm.user.password === ''){
      vm.message = "Choose a username and password!  Name cannot be left blank";
    } else {
      console.log('LoginController -- registerUser -- sending to server...', vm.user);
      $http.post('/register', vm.user).then(function (response) {
        console.log('LoginController -- registerUser -- success');
        $location.path('/home');
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- error');
        vm.message = "Please try again."
      });
    }
  }; //end registerCoach function
//   vm.registerParent = function () {
//     $location.path('/parentRegistration')
//     console.log('LoginController -- registerParent');
//     if (vm.user.username === '' || vm.user.password === '') {
//       vm.message = "Choose a username and password!";
//     } else {
//       console.log('LoginController -- registerUser -- sending to server...', vm.user);
//       $http.post('/register', vm.user).then(function (response) {
//         console.log('LoginController -- registerUser -- success');
//         $location.path('/home');
//       }).catch(function (response) {
//         console.log('LoginController -- registerUser -- error');
//         vm.message = "Please try again."
//       });
//     }
//   }
});
