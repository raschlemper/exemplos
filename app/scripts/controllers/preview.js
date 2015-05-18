'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('PreviewCtrl', function($scope, BlockService, LayoutService) {

    $scope.option = {};
    $scope.blocks = BlockService.service.getAll();
    $scope.option.selection = LayoutService.service.getOptionPreview();
    $scope.configuracao = LayoutService.service.getConfiguration();

    $scope.columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    $scope.addBlock = function(block) {
        BlockService.service.addBlock(block);
        $scope.block = {};
    };

    $scope.dadosteste = {
        "status": "R",
        "aluno": "Nome do Aluno",
        "vencimento": "08/05/2015",
        "pagamento": "08/05/2015",
        "valor": "100,00"
    }
});
