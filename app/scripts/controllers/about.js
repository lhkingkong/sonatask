'use strict';

/**
 * @ngdoc function
 * @name sonataskApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sonataskApp
 */
angular.module('sonataskApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
