app.directive("footer", function(layoutService) {
    return {
        templateUrl: 'scripts/directives/layout/footer/footer.html',
        restrict: "E",
        replace: true,
        transclude: true,
        require: ['^layout'],
        scope: true,
        link: function(scope, element, attrs, ctrls) {
            scope.layoutCtrl = ctrls[0];
            scope.configuracao = scope.layoutCtrl.getConfiguration();
            var getFooter =  function(){
                if (scope.configuracao.footer) {
                    scope.height = layoutService.getHeight(scope.configuracao.footer.line);
                    scope.column = scope.configuracao.footer.column;
                }
            };
            getFooter();
        }
    }
});
