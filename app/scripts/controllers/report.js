'use strict';

app.controller('ReportCtrl', function ($scope, JsonService) {
	
	$scope.list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	$scope.dadosteste = {"status": "R", "aluno": "Nome do Aluno", "vencimento": "08/05/2015", "pagamento": "08/05/2015", "valor": "100,00"}
	
    //define os menus superiores para o wizard
    $scope.configuracao = {};
    $scope.configuracao.menus = [{
        ordem: 1,
        titulo: "VisÃ£o"
    }, {
        ordem: 2,
        titulo: "Layout"
    }, {
        ordem: 3,
        titulo: "Campos"
    }, {
        ordem: 4,
        titulo: "ConfiguraÃ§Ã£o"
    }];

    $scope.configuracao.layout = {};

    $scope.configuracao.layout.header = {
        "column": 6,
        "line": 10
    };

    $scope.configuracao.layout.details = {
        "column": 12,
        "line": 8
    };

    $scope.configuracao.layout.footer = {
        "column": 12,
        "line": 6
    };

    $scope.isValid = function(booleano) {
        if(booleano === true){
            return booleano;
        }else{
            return false;
        }
    };
	
    $scope.report = {
        description: 'Relatório de Movimentação Financeira',
        cabecalho: {
            'column': 1,
            'fields': { 'ic_tipo_documento': { 'name': 'Documento', 'value': 'Tipo de Documento' }, 
                        'nm_instituicao_ensino': { 'name': 'Instituição', 'value': ' Nome da Instituição' }, 
                        'ds_tipo_curso': { 'name': 'Tipo Curso', 'value': 'Descrição tipo curso' }, 
                        'nm_curso': { 'name': 'Curso', 'value': 'Nome do curso' }, 
                        'ds_tipo_receita_despesa': { 'name': 'Receita', 'value': 'Descrição do tipo de receita' }
                      }
        },
        detalhe : {
            'column' : 1,
            'fields': { 
                'header': [ 'Aluno', 'Valor', 'Total' ],
                'values': [ 
                    [ 'Aluno 1', 'Valor 1', 'Total 1' ]
                ]
            }
        },
        rodape: {
            'column' : 1, 
            'size': [100] 
        },
        data: []
    };

    $scope.cabecalhoHtml = function() {
        var html = '<div class="row">';
        angular.forEach($scope.report.cabecalho.fields, function(value, key) {
            html += '<div class="col-md-12 item "><strong>' + value.name + ': </strong>' +  value.value + '</div>';
        });        
        html += '</div>';
        return html;
    }();

    var teste = function() {
        JsonService.movimento()
            .then( function(data) {
                console.log(data);
            })
            .catch( function(err) {
                return console.log(err);
            });
    }

    teste();

  });
