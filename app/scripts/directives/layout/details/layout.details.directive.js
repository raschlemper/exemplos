app.directive("details", function(layoutService) {
    return {
        templateUrl: 'scripts/directives/layout/details/details.html',
        restrict: "E",
        replace: true,
        transclude: true,
        require: ['^layout'],
        scope: true,
        link: function(scope, element, attrs, ctrls)  {
            scope.layoutCtrl = ctrls[0];
            scope.configuracao = scope.layoutCtrl.getConfiguration();
            var getDetails = function() {
                if (scope.configuracao.details) {
                    scope.height = layoutService.getHeight(scope.configuracao.details.line);
                    scope.column = scope.configuracao.details.column;
                }
            }
            getDetails();
        }
    }
});
