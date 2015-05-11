'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('ConfigurationCtrl', function($scope, $location, LayoutService, JsonService) {

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

    $scope.option = {
        'cabecalho': cabecalho,
        'detalhe': detalhe,
        'rodape': rodape
    };

    $scope.option.selection = {
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
        LayoutService.service.setOptionPreview($scope.option.selection);
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

    $scope.labels = [];
    var getCamposMovimento = function() {
        JsonService.campos()
            .then(function(data) {
                $scope.labels = data;
            })
            .catch(function(err) {
                return console.log(err);
            });
    }
    getCamposMovimento();

});
