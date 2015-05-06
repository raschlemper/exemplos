app.directive("header", function(layoutService, layoutSettings) {
    return {
        templateUrl: 'scripts/directives/layout/header/header.html',
        restrict: "E",
        replace: true,
        transclude: true,
        require: ['^layout'],
        scope: {
            title: "="
        },
        link: function(scope, element, attrs, ctrls)  {
            scope.layoutCtrl = ctrls[0];
            scope.configuracao = scope.layoutCtrl.getConfiguration();
            scope.maxColumns = layoutSettings.MAX_COLUMN;
            var getHeader =  function(){
                if (scope.configuracao.header) {
                    scope.height = layoutService.getHeightWithTitle(scope.configuracao.header.line);
                    scope.titleHeight = layoutService.getTitleHeight();
                    scope.column = scope.configuracao.header.column;
                }
            };
            var getTitle = function(){
                if(scope.preview){
                    return scope.title;
                }else{
                    var title = '<h3>'+scope.title+'</h3>';
                    return title;
                }
            };
            getHeader();
        }
    }
});
