'use strict';

app.directive('layout', ['$compile', 'layoutSettings', '$sce', function ($compile, layoutSettings, $sce) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'scripts/directives/layout/html/layout.template.html',
        controllerAs: 'layout',
        scope: {
            configuracao: "=",
            preview: "="
        },
        controller: ['$scope', function($scope){
            this.getConfiguration = function(){
                return $scope.configuracao;
            }
        }]
    }
}]);
