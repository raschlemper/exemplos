'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('ConfigurationCtrl', function($scope, $location, LayoutService, JsonService, VisioService, CampoService) {
    $scope.visio = {};

    $scope.cabecalhos = [];
    $scope.visio.layout = {};
    $scope.visio.layout.selection = {
        'cabecalho':{},
        'rodape':{},
        'detalhe':{}
    }
    var getCabecalhos = function() {
        LayoutService.service.getAll()
            .then(function(data) {
                var filtered = data.filter(function(value) {
                    return value.type == 'header';
                });
                $scope.cabecalhos = filtered;
                $scope.visio.layout.selection.cabecalho = filtered[0];
            })
            .catch(function(err) {
                return console.log(err);
            });
    };


    $scope.detalhes = [];

    var getDetalhes = function() {
        LayoutService.service.getAll()
            .then(function(data) {
                var filtered = data.filter(function(value) {
                    return value.type == 'details';
                });
                $scope.detalhes = filtered;
                $scope.visio.layout.selection.detalhe = filtered[0];
            })
            .catch(function(err) {
                return console.log(err);
            });
    }

    $scope.rodapes = [];

    var getRodape = function() {
        LayoutService.service.getAll()
            .then(function(data) {
                var filtered = data.filter(function(value) {
                    return value.type == 'footer';
                });
                $scope.rodapes = filtered;
                $scope.visio.layout.selection.rodape = filtered[0];
            })
            .catch(function(err) {
                return console.log(err);
            });
    }

    //define os menus superiores para o wizard
    $scope.configuracao = {
        'lineHeight': 15,
        'preview': {
            'lineHeight': 2
        }
    };
    $scope.configuracao.menus = [{
        ordem: 1,
        titulo: "Visão"
    }, {
        ordem: 2,
        titulo: "Layout"
    }, {
        ordem: 3,
        titulo: "Campos"
    }, {
        ordem: 4,
        titulo: "Configuração"
    }];

    $scope.makePreview = function() {
        LayoutService.service.setOptionPreview($scope.visio.layout.selection);
        LayoutService.service.setConfiguration($scope.configuracao);
        $location.path("/preview", "_blank");
    }

    $scope.isValid = function(booleano) {
        if (booleano === true) {
            return booleano;
        } else {
            return false;
        }
    };

    $scope.campos = [];
    var getCamposMovimento = function() {
        CampoService.campo()
            .then(function(data) {
                $scope.campos = data;
            })
            .catch(function(err) {
                return console.log(err);
            });
    }
    getCamposMovimento();

    $scope.visio.campos = [];

    $scope.addCampo = function(label) {
        if (!label.selected) {
            label.selected = true;
            $scope.visio.campos.push(label);
        } else {
            label.selected = false;
            var index = $scope.visio.campos.indexOf(label);
            if (index >= 0) {
                $scope.visio.campos.splice(index, 1);
            }
        }
    }

    $scope.removeCampo = function(selected) {
        selected.selected = false;
        var index = $scope.visio.selecionados.indexOf(selected);
        if (index >= 0) {
            $scope.visio.selecionados.splice(index, 1);
        }
    }

    $scope.saveVisio = function() {
        $scope.visio.createDate = new Date();
        $scope.visio.hashid = Math.floor(10000000000 + Math.random() * 90000000000);
        var arrayLayout = [];
        arrayLayout.push($scope.visio.layout.selection.cabecalho);
        arrayLayout.push($scope.visio.layout.selection.rodape);
        arrayLayout.push($scope.visio.layout.selection.detalhe);
        $scope.visio.layout.selection = arrayLayout;
        console.log($scope.visio.layout.selection);
        VisioService.service.addVisio($scope.visio);
        $location.path("/main");
    }

    $scope.groupBy = function(agrupamento) {
        for (var i = 0; i < $scope.visio.campos.length; i++) {
            $scope.visio.campos[i].groupby = agrupamento;
            console.log($scope.visio.campos[i].groupby);
        };
        $scope.setTab(1);
    }

    $scope.tab = 1;

    $scope.setTab = function(tabId) {
        $scope.tab = tabId;
    };

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    };

    getCabecalhos();
    getDetalhes();
    getRodape();

});
