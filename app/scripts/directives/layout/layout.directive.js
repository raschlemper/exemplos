'use strict';

app.directive('layout', ['$compile', '$sce', function ($compile, $sce) {
    return {
        restrict: 'E',
        transclude: true,
        replace:true,
        templateUrl: 'scripts/directives/layout/html/layout.template.html',
        controllerAs: 'layout',
        scope: {
            configuracao: "="
        },
        controller: ['$scope', function($scope){
            this.getConfiguration = function(){
                return $scope.configuracao;
            }
            this.isPreview = function(){
                return $scope.preview;
            }
        }]
    }
}]);
