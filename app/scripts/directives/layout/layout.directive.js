'use strict';

app.directive('layout', ['$compile', function ($compile) {

    return {

        restrict: 'E',
        transclude: true,
        templateUrl: 'scripts/directives/layout/html/layout.template.html',
        scope: {
            column: '=',
            size: '='
        },
        link: function(scope, element, attrs) {

            var template = '';
            var widthContainer = 100;

            scope.getColumns = function() {
                if(scope.size) { return ajustLastColumn(); }
                return ajustSameColumn();
            }

            scope.getStyleClass = function(num) { 
                return "width: " + num + "%"; 
            }

            function getSizeColumn(columns) {
                return widthContainer / columns;
            }

            function ajustSameColumn() {
                var columns = [];
                var tamTotal = widthContainer;
                var sizeColumn = getSizeColumn(scope.column);
                for(var i = 0; i < scope.column - 1; i++) {
                    tamTotal = tamTotal - sizeColumn;
                    columns[i] = sizeColumn;
                }
                columns[scope.column - 1] = tamTotal;
                
                return columns;
            }

            function ajustLastColumn() {
                var tamTotal = widthContainer;
                for(var i = 0; i < scope.size.length - 1; i++) {
                    tamTotal = tamTotal - scope.size[i];
                }
                if(scope.size[scope.size.length - 1] != tamTotal) {
                    scope.size[scope.size.length - 1] = tamTotal;
                }

                return scope.size;
            }

        }

    };

  }]);
