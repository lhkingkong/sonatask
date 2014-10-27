'use strict';

/**
 * @ngdoc directive
 * @name sonataskApp.directive:sonataskHeader
 * @description
 * # sonataskHeader
 */
angular.module('sonataskApp')
  .directive('sonataskHeader', function () {
    return {
      templateUrl: 'views/sonataskheader.html',
      restrict: 'A',
      replace: true,
      controller: ['$scope', '$timeout', '$location', 'userInfo', 'webServices', function($scope, $timeout, $location, userInfo, webServices){
      	$scope.user = userInfo.get();
      	$scope.logOff = function (e){
      		e.stopImmediatePropagation();
      		e.preventDefault();

      		webServices.logOff({}, function(response){
	    		if(!response.user){
	    			userInfo.clean();
	    			$location.path('/login');
	    		}else{
	    			$location.path('/');
	    		}
	    	});
      	}
      }],
      link: function postLink(scope, element, attrs) {
        //element.text('this is the sonataskHeader directive');
      }
    };
  });
