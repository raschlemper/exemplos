'use strict';

angular.module('exemplosApp')
  .directive('layoutDetalhe', [function () {

    return {

        restrict: 'E',
        transclude: true,
        templateUrl: 'scripts/directives/layout/html/layout.template.html',
        scope: {
            column: '=',
            size: '='
        },
        link: function(scope, element, attrs) {

            scope.getNumber = function(num) {
                return new Array(num);   
            }

            scope.getStyleClass = function(num) { 
                var tamCol = 100 / num;
                return "width: " + tamCol + "%"; 
            }

        }

    };

  }]);
