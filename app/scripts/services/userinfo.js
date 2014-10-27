'use strict';

/**
 * @ngdoc service
 * @name sonataskApp.userInfo
 * @description
 * # userInfo
 * Factory in the sonataskApp.
 */
angular.module('sonataskApp')
  .factory('userInfo', function () {
    // Service logic
    // ...

    var set = function(user){
      this.user = user;
    }

    var get = function(){
      return this.user;
    }

    var clean = function(){
      delete this.user;
    }

    // Public API here
    return {
      set: set,
      get: get,
      clean: clean
    };
  });
