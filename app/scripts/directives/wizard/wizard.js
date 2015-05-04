app.directive("wizard", function() {
    return {
        templateUrl: 'scripts/directives/wizard/views/wizardTemplate.html',
        restrict: "E",
        transclude:true,
        scope: {
        	configuracao:"=",
        	steps:"="
        },
        link: function(scope){
        	scope.atual = 1;

        	scope.proximo = function(){
        		if(scope.atual < scope.steps){
        			scope.atual = scope.atual + 1;
        		}
        	};

        	scope.anterior = function(){
				if(scope.atual <= scope.steps){
        			scope.atual = scope.atual - 1;
        		}
        	};

        	scope.isAtual = function(order){
        		if(order === scope.atual){
        			return true;
        		}
        	}

        }
    }
});
