'use strict';

/**
 * @ngdoc directive
 * @name sonataskApp.directive:sonataskMain
 * @description
 * # sonataskMain
 */
angular.module('sonataskApp')
  .directive('sonataskMain', function () {
    return {
      templateUrl: 'views/sonataskmain.html',
      restrict: 'A',
      replace: true,
      controller: ['$scope', '$element', '$timeout', '$location', 'userInfo', 'webServices', function($scope, $element, $timeout, $location, userInfo, webServices){
        $scope.tasks = [];
        $scope.taskToEdit = {};
        $scope.somethingToEdit = false;

        $scope.init = function(){
          $scope.getTasks();
        }

        $scope.getTasks = function(){
          webServices.getTasks({}, function(response){
            $scope.fillTasks(response);
          });
        }

        $scope.fillTasks = function(response){
          if(typeof response.output != "undefined"){
            $scope.tasks = response.output;
            $timeout(function(){
              $element.find('#taskList').sortable({
                items: ".sonaTask",
                tolerance: "pointer",
                helper: "clone",
                start: function(event, ui) {
                  ui.item.data('start_pos', ui.item.index());
                },
                stop: function(event, ui){
                  event.stopImmediatePropagation();

                  var start_pos = ui.item.data('start_pos');
                  if (start_pos != ui.item.index()) {
                    var data = $(this).sortable('toArray'),
                      ids = [];

                    for(var i=0, len = data.length; i<len; i++){
                      ids.push(data[i].substring(9));
                    }
                    webServices.sortTasks({sortedIDs: ids}, function(response){
                      $scope.fillTasks(response);
                    });
                  }
                }
              });
            });
          }
        }

       

        $scope.$on('sonataskMain/fillTasks', function(e, response){
          $scope.fillTasks(response);
        });

        $scope.removeTask = function(e,item){
          e.stopImmediatePropagation();
          e.preventDefault();

          if(confirm("Are you sure you want to remove this Note?")){
            webServices.removeTask({task_id:item.id}, function(response){
              $scope.fillTasks(response);
            });
          }
        }

         $scope.openEdit = function(e, item){
          e.stopImmediatePropagation();
          e.preventDefault();

          $scope.taskToEdit = jQuery.extend(true, {}, item);
          $scope.somethingToEdit = true;

          $('#myModal').modal('show');
        }

        $('#myModal').on('hide.bs.modal', function (e) {
          $scope.$apply(function(){
            $scope.somethingToEdit = false;
          });
        });

      }],
      link: function postLink(scope, element, attrs) {
        scope.init();
      }
    };
  });
