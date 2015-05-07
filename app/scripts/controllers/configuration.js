'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('ConfigurationCtrl', function($scope) {

    var cabecalho = [{
        'name': 'Com título',
        'configuracao': {
            'header': {
                'column': 12,
                'line': 35
            },
            'title': {
                'column': 12,
                'line': 10,
                'offsetLine':1
            },
            'headerContent': {
                'column': 12,
                'line': 25
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
                'line': 10
            }
        },
        'type': 'column'
    }, {
        'name': 'Em linhas',
        'configuracao': {
            'details': {
                'column': 12,
                'line': 10
            }
        },
        'type': 'line'
    }];

    var rodape = [{
        'name': 'Abaixo',
        'configuracao': {
            'footer': {
                'column': 12,
                'line': 6
            },
            'details': {
                'column': 12,
                'line': 6
            }
        }
    }, {
        'name': 'Lateral',
        'configuracao': {
            'footer': {
                'column': 3,
                'line': 10
            },
            'details': {
                'column': 8,
                'line': 10
            }
        }
    }, {
        'name': 'Ambos',
        'configuracao': {
            'footer': {
                'column': 12,
                'line': 6
            },
            'details': {
                'column': 12,
                'line': 6
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
    $scope.configuracao = {'lineHeight':30, 'preview':{
        'lineHeight':2
    }};
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

    $scope.isValid = function(booleano) {
        if (booleano === true) {
            return booleano;
        } else {
            return false;
        }
    };

});
