'use strict';

/**
 * @ngdoc service
 * @name sonataskApp.webServices
 * @description
 * # webServices
 * Factory in the sonataskApp.
 */
angular.module('sonataskApp')
  .factory('webServices', ['$resource', '$http',function ($resource, $http) {
    // Service logic
    // ...
    $http.defaults.useXDomain = true;

    var verifyUser = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller',{controller:"user"});
      
      Service = Service.get({}).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);

      /*$.post("http://localhost:8080/user/", 
        params,
        function(data){
            console.log(data);
        });*/
    }

    var signIn = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/sign_in',{controller:"user"});
      
      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var signUp = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/sign_up',{controller:"user"});
      
      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var logOff = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/log_off',{controller:"user"});
      
      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    // tasks
    var getTasks = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller',{controller:"task"});

      Service = Service.get(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var createTask = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/create',{controller:"task"}, { "insert" : {method:'POST'} });

      Service = Service.insert(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var editTask = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/',{controller:"task"});

      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var sortTasks = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/sort',{controller:"task"});

      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var removeTask = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/:task_id',{controller:"task"});

      Service = Service.delete(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }


    //used for all
    var _successResponse = function(response, callback){
      return callback(response);
    }

    var _errorResponse = function(error){
      alert("Error when you call a service, please try again");
    }

    // Public API here
    return {
      verifyUser: verifyUser,
      signIn: signIn,
      signUp: signUp,
      logOff: logOff,
      getTasks: getTasks,
      createTask: createTask,
      sortTasks: sortTasks,
      removeTask: removeTask,
      editTask: editTask
    };
  }]);
