'use strict';

/**
 * @ngdoc function
 * @name sonataskApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sonataskApp
 */
angular.module('sonataskApp')
  .controller('LoginCtrl', ['$scope', '$location', '$timeout', 'webServices', 'userInfo', function ($scope, $location, $timeout, webServices, userInfo) {
    $scope.loginUser = "";
  	$scope.loginPassword = "";
    $scope.wrongUser = false;
    $scope.somethingWrong = false;

    $('#inputUser').popover();
    $('#inputPassword').popover();

    $scope.signIn = function(e){
    	e.stopImmediatePropagation();
    	e.preventDefault();

        if($.trim($scope.loginUser)==""){
            $('#inputUser').popover("show");
            return false;
        }
        if($.trim($scope.loginPassword)==""){
            $('#inputPassword').popover("show");
            return false;
        }

    	webServices.signIn({ user: $scope.loginUser, password: $scope.loginPassword }, function(response){
    		if(typeof response.user == "undefined"){
    			$scope.somethingWrong = true;
    		}else{
                if(!response.user){
                    $scope.wrongUser = true;
                    $timeout(function(){
                        $scope.wrongUser = false;
                    },2000);
                    return false;
                }
    			userInfo.set(response.user);
    			$location.path('/');
    		}
    	});
    }

    $scope.signUp = function(e){
        e.stopImmediatePropagation();
        e.preventDefault();
        $location.path('/register');
    }

  }]);
