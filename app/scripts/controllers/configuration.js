'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('ConfigurationCtrl', function($scope, $filter, $location, $routeParams, $window, TemplateService, JsonService, VisioService, EntityService) {

    $scope.visio = {};
    $scope.templates = [];
    $scope.campos = [];
    $scope.selection = {};
    $scope.component = {};
    $scope.totalItens = 0;
    $scope.selectedsFiltered = [];
    $scope.groups = [];
    $scope.totalizadores = [];
    $scope.form = {};
    $scope.agrupador = {};

    //Código para paginação
    var totalItens = function() {
        if ($scope.component.data) {
            if ($scope.component.data.fields.length) {
                $scope.totalItens = $scope.component.data.fields.length;
            }
        }
    };

    $scope.totalPorPagina = 3;
    $scope.paginaAtual = 1;

    $scope.editComponent = function(component) {
        $scope.component = component;
        if (component.type === 'table' || component.type === 'list') {
            if (!$scope.component.data) {
                $scope.component.data = {
                    'fields': []
                };
                $scope.selectedsFiltered = [];
            }
        }
        getCamposMovimento();
    }

    $scope.selectTemplate = function() {
        $scope.visio.layout = $scope.selection.template;
        $scope.visio.layout.templateId = $scope.selection.template._id;
        console.log($scope.visio.layout.templateId);
    }

    $scope.saveFields = function() {
        for (var i = 0; i < $scope.visio.layout.containers.length; i++) {
            for (var a = 0; a < $scope.visio.layout.containers[i].components.length; a++) {
                if ($scope.visio.layout.containers[i].components[a]._id === $scope.component._id) {
                    $scope.visio.layout.containers[i].components[a].data.fields === $scope.component.data.fields;
                }
            };
        };
    }

    var carregaVisio = function() {
        if ($routeParams.hashid) {
            VisioService.service.getByHashid($routeParams.hashid).then(function(data) {
                    $scope.visio = data[0];
                })
                .catch(function(err) {
                    return console.log(err);
                });
        } else {
            $scope.visio.campos = [];
            $scope.visio.layout = {};
        }
        getTemplates();
    }

    var getTemplates = function() {
            TemplateService.service.getAll()
                .then(function(data) {
                    $scope.templates = data;
                    if (!$routeParams.hashid) {
                        $scope.selection.template = data[0];
                        $scope.visio.layout = data[0];
                        $scope.visio.layout.templateId = data[0]._id;
                    } else {
                        var selecionado = $scope.templates.filter(function(value) {
                            return value._id == $scope.visio.layout.templateId;
                        });
                        $scope.selection.template = selecionado[0];
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
        titulo: "Template"
    }, {
        ordem: 3,
        titulo: "Campos"
    }, {
        ordem: 4,
        titulo: "Configuração"
    }];

    $scope.makePreview = function() {
        TemplateService.service.setOptionPreview($scope.visio.layout);
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
                var campos = data;
                if ($scope.component.data) {
                    campos.filter(function(campo) {
                        if ($scope.component.data.fields.length) {
                            for (var i = 0; i < $scope.component.data.fields.length; i++) {
                                if (campo._id === $scope.component.data.fields[i]._id) {
                                    $scope.component.data.fields[i].selected = true;
                                    campo.selected = true;
                                }
                            };
                            $scope.selectedsFiltered = $scope.component.data.fields;
                        }
                    });
                };
                $scope.campos = campos;
            })
            .catch(function(err) {
                return console.log(err);
            });
    }

    $scope.addCampo = function(label) {
        if (!label.selected) {
            label.selected = true;
            $scope.component.data.fields.push(label);
        } else {
            label.selected = false;
            $scope.component.data.fields = _.without($scope.component.data.fields, _.findWhere($scope.component.data.fields, {
                _id: label._id
            }));
        }
        $scope.selectedsFiltered = $scope.component.data.fields;
        totalItens();
        filtraSelecionados();
    }

    $scope.removeCampo = function(selected) {
        selected.selected = false;
        $scope.component.data.fields = _.without($scope.component.data.fields, _.findWhere($scope.component.data.fields, {
            _id: selected._id
        }));
        $scope.selectedsFiltered = $scope.component.data.fields;
        totalItens();
        filtraSelecionados();
    }

    $scope.saveVisio = function() {
        if (!$routeParams.hashid) {
            $scope.visio.createDate = new Date();
            $scope.visio.hashid = Math.floor(10000000000 + Math.random() * 90000000000);
            VisioService.service.addVisio($scope.visio);
        } else {
            VisioService.service.update($scope.visio);
        }
        $location.path("/main");
    }

    var filtraSelecionados = function() {
        var pagina = $scope.paginaAtual - 1;
        $scope.selectedsFiltered = $filter('startPage')($scope.component.data.fields, pagina * $scope.totalPorPagina);
    }

    $scope.tab = 1;

    $scope.addFieldGroup = function(groupSelected) {
        var isSelected = $scope.groups.find(function(item) {
            return item._id === groupSelected._id;
        });
        if (!isSelected) {
            $scope.groups.push(groupSelected);
        }
    };

    $scope.removeFieldGroup = function(field) {
        $scope.groups = _.without($scope.groups, _.findWhere($scope.groups, {
            _id: field._id
        }));
    };

    $scope.createGrouper = function(){
        $scope.agrupador.groups = $scope.groups;
        $scope.totalizadores.push($scope.agrupador);
        $scope.groups = [];
        $scope.agrupador = {};
        $scope.setTab(1);
    };

    $scope.pushTotalizadores = function(){
        if($scope.component.data.fields.length){
            for (var i = $scope.totalizadores.length - 1; i >= 0; i--) {
                $scope.component.data.fields.push($scope.totalizadores[i]);
            };
        };
    };

    $scope.setTab = function(tabId) {
        $scope.tab = tabId;
    };

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    };

    var init = function() {
        carregaVisio();
    }

    init();

});
