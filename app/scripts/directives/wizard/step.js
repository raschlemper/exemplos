app.directive("step", function() {
    return {
        templateUrl: 'scripts/directives/wizard/views/stepTemplate.html',
        restrict: "E",
        replace: true,
        transclude: true,
        require: ['^wizard'],
        scope: {
            ordem: "="
        },
        link: function(scope, element, attrs, ctrls) {
            scope.wizardCtrl = ctrls[0];
            scope.mostraAtual = function() {
                return scope.wizardCtrl.mostraAtual();
            };

            scope.isActive = function(){
            	if(scope.ordem === scope.mostraAtual()){
            		return true;
            	}
            };
        }
    }
});
