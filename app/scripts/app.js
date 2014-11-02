'use strict';

/**
 * @ngdoc overview
 * @name sonataskApp
 * @description
 * # sonataskApp
 *
 * Main module of the application.
 */
angular
  .module('sonataskApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'contenteditable'
  ])
  .config(['$routeProvider','$httpProvider',function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials=true;
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          response : [ 'webServices', '$q', '$location', '$resource', 'userInfo', function(webServices, $q, $location, $resource, userInfo) {
            var dfd = $q.defer();
            var user = userInfo.get();
            if(!user){
              webServices.verifyUser({}, function(response){
                if(response.user){
                  userInfo.set(response.user);
                  dfd.resolve();
                }else{
                  $location.path('/login');
                  dfd.resolve();
                }
              });
            }else{
              dfd.resolve();
            }
            
            return dfd.promise;
          } ]
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          response : [ 'webServices', '$q', '$location', '$resource', 'userInfo', function(webServices, $q, $location, $resource, userInfo) {
            var dfd = $q.defer();
            
            var user = userInfo.get();
            if(!user){
              webServices.verifyUser({}, function(response){
                if(!response.user){
                  dfd.resolve();
                }else{
                  $location.path('/');
                  dfd.resolve();
                }
              });
            }else{
              $location.path('/');
              dfd.resolve();
            }

            return dfd.promise;
          } ]
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
