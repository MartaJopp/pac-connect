var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'angularMoment', 'jkAngularCarousel', 'angular-filepicker']);
// myApp.constant('moment', moment);
/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/coachRegistration', {
      templateUrl: '/views/templates/register_coach.html',
      controller: 'LoginController as lc',
    })
    .when('/parentRegistration', {
      templateUrl: '/views/templates/register_parent.html',
      controller: 'LoginController as lc',
    })
    .when('/athleteRegistration', {
      templateUrl: '/views/templates/register_athlete.html',
      controller: 'LoginController as lc',
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/team', {
      templateUrl: '/views/templates/team.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/sent', {
      templateUrl: '/views/templates/sent.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/attendance', {
      templateUrl: '/views/templates/viewAttendance.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
