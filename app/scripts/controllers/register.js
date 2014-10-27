'use strict';

/**
 * @ngdoc function
 * @name sonataskApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the sonataskApp
 */
angular.module('sonataskApp')
  .controller('RegisterCtrl', [ '$scope', '$location', '$timeout', 'webServices', 'userInfo', function ($scope, $location, $timeout, webServices, userInfo) {
    $scope.loginUser = "";
  	$scope.loginPassword = "";
    $scope.loginEmail = "";
    $scope.wrongUser = false;
    $scope.somethingWrong = false;
    $scope.notEqual = false;

    $('#inputUser').popover();
    $('#inputEmail').popover();
    $('#inputPassword').popover();
    $('#inputConfirmPassword').popover();

    $scope.signUp = function(e){
    	e.stopImmediatePropagation();
    	e.preventDefault();
        
        if($.trim($scope.loginUser)==""){
            $('#inputUser').popover("show");
            return false;
        }
        if($.trim($scope.loginEmail)==""){
            $('#inputEmail').popover("show");
            return false;
        }
        if($.trim($scope.loginPassword)==""){
            $('#inputPassword').popover("show");
            return false;
        }
        if($.trim($scope.loginConfirmPassword)==""){
            $('#inputConfirmPassword').popover("show");
            return false;
        }
        if($.trim($scope.loginConfirmPassword)!=$.trim($scope.loginPassword)){
        	$scope.notEqual = true;
        	$timeout(function(){
        		$scope.notEqual = false;
        	},2000);
            return false;
        }

    	webServices.signUp({ user: $scope.loginUser, email:$scope.loginEmail, password: $scope.loginPassword }, function(response){
    		if(typeof response.user == "undefined"){
    			$scope.somethingWrong = true;
    		}else{
                if(!response.user){
                    $scope.wrongUser = true;
                    return false;
                }
    			userInfo.set(response.user);
    			$location.path('/');
    		}
    	});
    }

    $scope.cancel = function(e){
    	$location.path('/login');
    }

  }]);
