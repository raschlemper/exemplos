app.directive("wizard", function() {
    return {
        templateUrl: 'scripts/directives/wizard/views/wizardTemplate.html',
        restrict: "E",
        transclude: true,
        controllerAs: 'wizard',
        scope: {
            configuracao: "=",
            steps: "="
        },
        controller: ['$scope', function($scope) {
            $scope.atual = 1;

            $scope.proximo = function() {
                if ($scope.atual < $scope.steps) {
                    $scope.atual = $scope.atual + 1;
                }
            };

            $scope.anterior = function() {
                if ($scope.atual <= $scope.steps) {
                    $scope.atual = $scope.atual - 1;
                }
            };

            $scope.updateAtual = function(order){
                if(!$scope.isAtual(order)){
                    $scope.atual = order;
                    console.log(angular.element("li.ng-binding.ng-scope.complete"));
                }
            };

            $scope.isAtual = function(order) {
                if (order === $scope.atual) {
                    return true;
                }else{
                    return false;
                }
            };

            this.isAtualGlobal = function(order) {
                if (order == $scope.atual) {
                    return true;
                }
            };
            
            this.mostraAtual = function(){
                return $scope.atual;
            };

        }]
    }
});
