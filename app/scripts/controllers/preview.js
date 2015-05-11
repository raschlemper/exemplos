'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('PreviewCtrl', function($scope, LayoutService) {

    $scope.option = {};
    $scope.option.selection = LayoutService.service.getOptionPreview();
    $scope.configuracao = LayoutService.service.getConfiguration();

});
