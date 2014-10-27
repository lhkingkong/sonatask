'use strict';

/**
 * @ngdoc directive
 * @name sonataskApp.directive:taskCreator
 * @description
 * # taskCreator
 */
angular.module('sonataskApp')
  .directive('taskCreator', function () {
    return {
      templateUrl: 'views/taskcreator.html',
      restrict: 'A',
      scope:{},
      replace: true,
      controller: ['$scope', '$element', '$timeout', '$location', 'userInfo', 'webServices', function($scope, $element, $timeout, $location, userInfo, webServices){
        $scope.init = function(){
          $scope.title = "";
          $scope.taskContent = "";
          $scope.isList = false;
          $scope.newListOptions = [{text:"", checked: false, isNew: true}];
          $scope.haveEmptyItem = true;
          $scope.showExpirationDate = false;
          $scope.expDate ="";
        }

      	$scope.init();

        $('.expirationDate').datepicker();

        $timeout(function(){
          $element.find('#createTaskList').sortable({
            items: ".newListOptions",
                tolerance: "pointer",
                helper: "clone",
                handle: ".itemHandle",
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
                      ids.push(data[i].substring(15));
                    }

                    $scope.$apply(function(){
                      var sortedItems = [];
                      for(var i=0, len = ids.length; i<len; i++){
                        sortedItems.push($scope.newListOptions[ids[i]]);
                      }
                    
                      $timeout(function(){
                        $scope.newListOptions = sortedItems.slice(0);
                      });
                    });
                  }
                }
            });
        });

        $scope.toggleCheck = function(e,item){
          item.checked = !item.checked;
        }

        $scope.toggleList = function(e){
          $scope.isList = !$scope.isList;
          if($scope.isList){
            $scope.newListOptions = [{text:"", checked: false, isNew: true}];
            if($scope.taskContent !=""){
              var array = $scope.taskContent.split('<br>'),
                  len = array.length;
              if(len>0){
                $scope.newListOptions = [];
                var text ="";
                for(var i = 0; i<len; i++){
                  text= $.trim(array[i]);
                  if(text!="")
                    $scope.newListOptions.push({text:text, checked: false, isNew: false});
                }
                $scope.newListOptions.push({text:"", checked: false, isNew: true});
              }
            }
          }else{
            $scope.taskContent = "";
            for(var i = 0, len = $scope.newListOptions.length; i<len; i++){
              if(i==0)
                $scope.taskContent += $scope.newListOptions[i].text;
              else
                $scope.taskContent += "<br>" + $scope.newListOptions[i].text;
            }
          }
        }

        $scope.createNewItem = function(e, item){
          if(item.isNew){
            item.isNew = false;
            $scope.newListOptions.push({text:"", checked: false, isNew: true});
          }
        }

        $scope.setTime = function(e){
          e.stopImmediatePropagation();
          e.preventDefault();
          $scope.showExpirationDate = !$scope.showExpirationDate;
        }

      	$scope.postIt = function(e){
      		e.stopImmediatePropagation();
      		e.preventDefault();

          var temp = $scope.newListOptions.slice(0);
          temp.pop();
          var params = {
            title: $scope.title,
            listOptions: temp,
            expDate: $scope.expDate,
            content: $scope.taskContent,
            taskType: $scope.isList?1:0
          }
          webServices.createTask(params, function(response){
            $scope.$emit('sonataskMain/fillTasks',response);
            if(typeof response.output!="undefined")
              $scope.init();
            else
              alert("Sorry, try to log again");
          })
      	}

      }],
      link: function postLink(scope, element, attrs) {
      }
    };
  });
