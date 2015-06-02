'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exemplosApp
 */
app.controller('MainCtrl', function($scope, $location, $filter, VisioService) {

    $scope.visios = [];
    $scope.totalItens = 0;
    $scope.totalPorPagina = 6;
    $scope.paginaAtual = 1;
    $scope.filtered = [];

    $scope.mudaPagina = function(pagina) {
        $scope.paginaAtual = pagina;
        filtraSelecionados();
    };

    $scope.newVisio = function() {
        $location.path("/configuration");
    };

    $scope.viewReport = function(visio) {
        $location.url('/report').search('hashid', visio.hashid);
    };

    $scope.updateVisio = function(visio) {
        $location.url('/configuration').search('hashid', visio.hashid);
    }

    var getVisios = function() {
        VisioService.service.getAll()
            .then(function(data) {
                $scope.visios = data;
                $scope.totalItens = data.length;
                filtraSelecionados();
            })
            .catch(function(err) {
                return console.log(err);
            });
    };


    $scope.removeVisio = function(visio) {
        VisioService.service.remove(visio);
        getVisios();
    }

    var init = function() {
        getVisios();
    }();


    var filtraSelecionados = function() {
        var pagina = $scope.paginaAtual - 1;
        $scope.filtered = $filter('startPage')($scope.visios, pagina * $scope.totalPorPagina);
    }
});
