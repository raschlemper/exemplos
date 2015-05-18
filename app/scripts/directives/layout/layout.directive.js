'use strict';

app.directive('layout', ['$compile', '$sce', function ($compile, $sce) {
    return {
        restrict: 'E',
        transclude: true,
        replace:true,
        templateUrl: 'scripts/directives/layout/html/layout.template.html',
        scope: {
            configuracao: "=",
            preview: "=",
            minHeight: "=",
            blocks: "="
        },
        link: function(scope){
            scope.getHeight = function(){
                if(scope.minHeight){
                    return "min-height:"+scope.minHeight+"px;";
                }
            }
            scope.previewStyle = function(){
                if(scope.preview){
                    return "layout layout-border";
                }
            }
        }
    }
}]);
