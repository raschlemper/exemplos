'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('ConfigurationCtrl', function($scope, $location, LayoutService, JsonService, VisioService) {
    $scope.visio = {};

    var cabecalho = [{
        'name': 'Com título',
        'configuracao': {
            'header': {
                'column': 12,
                'line': 35
            },
            'title': {
                'column': 12,
                'line': 17,
                'offsetLine': 1
            },
            'headerContent': {
                'column': 12,
                'line': 18
            }
        },
    }, {
        'name': 'Sem título',
        'configuracao': {
            'header': {
                'column': 12,
                'line': 35
            },
            'headerContent': {
                'column': 12
            }
        },
    }, {
        'name': 'Com logo',
        'configuracao': {
            'header': {
                'column': 12,
                'line': 35
            },
            'headerContent': {
                'column': 8,
                'line': 35
            },
            'foto': {
                'column': 4,
                'line': 35
            }
        },
    }];

    var detalhe = [{
        'name': 'Em colunas',
        'configuracao': {
            'details': {
                'column': 12,
                'line': 35
            }
        },
        'type': 'column'
    }, {
        'name': 'Em linhas',
        'configuracao': {
            'details': {
                'column': 12,
                'line': 35
            }
        },
        'type': 'line'
    }];

    var rodape = [{
        'name': 'Abaixo',
        'configuracao': {
            'footer': {
                'column': 12,
                'line': 15,
                'offsetLine': 1
            },
            'details': {
                'column': 12,
                'line': 20
            },
            'detailsContent': {
                'column': 12,
                'line': 20
            }
        }
    }, {
        'name': 'Lateral',
        'configuracao': {
            'footer': {
                'column': 4,
                'line': 35
            },
            'details': {
                'column': 12,
                'line': 35
            },
            'detailsContent': {
                'column': 8,
                'line': 35
            }
        }
    }, {
        'name': 'Ambos',
        'configuracao': {
            'footer': {
                'column': 12,
                'line': 10,
                'offsetLine': 1
            },
            'total': {
                'column': 4,
                'line': 25
            },
            'details': {
                'column': 12,
                'line': 25
            },
            'detailsContent': {
                'column': 8,
                'line': 25
            }
        }
    }];

    $scope.visio.option = {
        'cabecalho': cabecalho,
        'detalhe': detalhe,
        'rodape': rodape
    };

    $scope.visio.option.selection = {
        'cabecalho': cabecalho[0],
        'detalhe': detalhe[0],
        'rodape': rodape[0]
    };

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
        LayoutService.service.setOptionPreview($scope.visio.option.selection);
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

    $scope.visio.campos = [];
    var getCamposMovimento = function() {
        JsonService.campos()
            .then(function(data) {
                $scope.visio.campos = data;
            })
            .catch(function(err) {
                return console.log(err);
            });
    }
    getCamposMovimento();

    $scope.visio.selecionados = [];

    $scope.addCampo = function(label) {
        if (!label.selected) {
            label.selected = true;
            $scope.visio.selecionados.push(label);
        } else {
            label.selected = false;
            var index = $scope.visio.selecionados.indexOf(label);
            if (index >= 0) {
                $scope.visio.selecionados.splice(index, 1);
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
        VisioService.service.addVisio($scope.visio);
        $location.path("/main");
    }

    $scope.groupBy = function(agrupamento){
        for (var i = 0; i < $scope.visio.selecionados.length; i++) {
            $scope.visio.selecionados[i].groupby = agrupamento;
            console.log($scope.visio.selecionados[i].groupby);
        };
    }

    $scope.tab = 1;

    $scope.setTab = function(tabId) {
        $scope.tab  = tabId;
    };

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    };
});
