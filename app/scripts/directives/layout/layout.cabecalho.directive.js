'use strict';

app.directive('layoutCabecalho', [function () {

    return {

        restrict: 'E',
        transclude: true,
        templateUrl: 'scripts/directives/layout/html/layout.template.html',
        scope: {
            column: '=',
            size: '='
        },
        link: function(scope, element, attrs) {

            scope.columns = [];

            scope.getColumns = function() {
                if(scope.size) { ajustLastColumn(); }
                else { ajustSameColumn(); }
                return scope.columns;
            }

            scope.getStyleClass = function(num) { 
                // var tamCol = getSizeColumn(num);
                return "width: " + num + "%"; 
            }

            function getSizeColumn(columns) {
                return 100 / columns;
            }

            function ajustSameColumn() {
                var tamTotal = 100;
                var sizeColumn = getSizeColumn(scope.column);
                for(var i = 0; i < scope.column - 1; i++) {
                    tamTotal = tamTotal - sizeColumn;
                    scope.columns[i] = sizeColumn;
                }
                scope.columns[scope.column - 1] = tamTotal;
                
                scope.columns;
            }

            function ajustLastColumn() {
                var tamTotal = 100;
                for(var i = 0; i < scope.size.length - 1; i++) {
                    tamTotal = tamTotal - scope.size[i];
                }
                if(scope.size[scope.size.length - 1] != tamTotal) {
                    scope.size[scope.size.length - 1] = tamTotal;
                }

                scope.columns = scope.size;
            }

        }

    };

  }]);
