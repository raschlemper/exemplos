'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('ConfigurationCtrl', function($scope, $location, $routeParams, LayoutService, JsonService, VisioService, EntityService) {

    $scope.visio = {};
    $scope.layouts = [];
    $scope.campos = [];
    $scope.selection = {};

    var carregaVisio = function() {
        if ($routeParams.hashid) {
            VisioService.service.getByHashid($routeParams.hashid).then(function(data) {
                    $scope.visio = data[0];
                })
                .catch(function(err) {
                    return console.log(err);
                });
        } else {
            $scope.visio = {};
            $scope.visio.campos = [];
            $scope.visio.layout = {};
        }
    }

    var getLayouts = function() {
        LayoutService.service.getAll()
            .then(function(data) {
                $scope.layouts = data;
                if (!$routeParams.hashid) {
                    $scope.selection.layout = data[0];
                } else {
                    var selecionado = $scope.layouts.filter(function(value) {
                        return value._id == $scope.visio.layout;
                    });
                    $scope.selection.layout = selecionado[0];
                }
            })
            .catch(function(err) {
                return console.log(err);
            });
    }

    //define os menus superiores para o wizard
    $scope.menus = [{
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
        LayoutService.service.setOptionPreview($scope.selection.layout);
        LayoutService.service.setConfiguration($scope.configuracao);
        $location.path("/preview");
    }

    $scope.isValid = function(booleano) {
        if (booleano === true) {
            return booleano;
        } else {
            return false;
        }
    };


    var getCamposMovimento = function() {
        EntityService.entity()
            .then(function(data) {
                $scope.campos = data;
            })
            .catch(function(err) {
                return console.log(err);
            });
    }

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
        var index = $scope.visio.campos.indexOf(selected);
        if (index >= 0) {
            $scope.visio.campos.splice(index, 1);
        }
    }

    $scope.saveVisio = function() {
        if (!$routeParams.hashid) {
            $scope.visio.createDate = new Date();
            $scope.visio.hashid = Math.floor(10000000000 + Math.random() * 90000000000);
            $scope.visio.layout = $scope.selection.layout._id;
            VisioService.service.addVisio($scope.visio);
        } else {
            $scope.visio.layout = $scope.selection.layout._id;
            VisioService.service.update($scope.visio);
        }
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

    carregaVisio();
    getLayouts();
    getCamposMovimento();

});
