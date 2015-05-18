'use strict';

app.controller('ReportCtrl', function ($scope, $filter, ReportService, JsonService) {
	
	// $scope.list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	// $scope.dadosteste = {"status": "R", "aluno": "Nome do Aluno", "vencimento": "08/05/2015", "pagamento": "08/05/2015", "valor": "100,00"}
    
    var index = 1;

    $scope.report = {
        titulo: 'Relatário de Movimentação Financeira',
        cabecalho: {},
        detalhe: {},
        rodape: {}
    };

    $scope.links = [
            [ 
                [ "129 - Sistema Modelo - Alegria", "Arquitetura e Urbanismo" ],
                [ "129 - Sistema Modelo - Alegria", null ] 
            ]
        ];
    $scope.headers = [];
    $scope.details = [];
    var dataFormat = null;

    var getData = function(index) {
        ReportService.movimento()
            .then( function(data) {
                getDataReport(data);
                getFieldHeaderValue($scope.report.data[index].key);
                getFieldDetailValue($scope.report.data[index].vals);
                getFieldFooterValue($scope.report.data[index].vals);
            })
            .catch( function(err) {
                return console.log(err);
            });
    }

    var getDataReport = function(data) {
        var groups = getFieldsGroup($scope.report.cabecalho.fields);        
        $scope.report.data = DataGrouper.report(data, groups); 
    }

    var getFieldsGroup = function(fields) {
        var groups = [];
        _.map(fields, function(field, index) {
            _.map(field.value, function(value, index) {
                groups.push(value.field);  
            }); 
        }); 
        return groups;
    } 

    var removeFieldsGroup = function(group, remove) {
        _.map(remove, function(item){ 
            group = _.without(group, item); 
        });
        return group;
    } 

    var getFieldValue = function(data, fields) {
        dataFormat = angular.copy(data);    
        return _.map(fields, function(field, key) {
            applyFilter(dataFormat, field);
            return { name: field.name, value: getExpressionValue(dataFormat, field.expression) };
        });        
    }  

    var applyFilter = function(data, field) {
        return _.map(field.value, function(item, key) {
            if(!item.filter) return;
            if(item.filter.length == 2) {
                data[item.field] = $filter(item.filter[0])(data[item.field], item.filter[1]); 
            } else if(item.filter.length == 3) {
                data[item.field] = $filter(item.filter[0])(data[item.field], item.filter[1], item.filter[2]); 
            }                
        }); 
    }  

    var getExpressionValue = function(data, expression) {        
        var template = _.template(expression);
        var result = template(data);
        return result;
    }



    var getLinkValue = function(data, fields) {
        return _.map(data, function(value, key) {
            return  _.map(fields, function(field, key) {
                return _.property(field)(value.key);
            });
        });        
    }  

    // HEADER

    $scope.report.cabecalho = {
        'fields': [ 
                    { 'name': 'Instituição', 'key': ['cd_instituicao_ensino'], 
                                             'value': [ { 'field': 'nm_instituicao_ensino' } ], 
                                             'expression': '<%= nm_instituicao_ensino %>' },
                    { 'name': 'Curso', 'key': ['cd_tipo_curso'], 
                                       'value': [ { 'field': 'ds_tipo_curso' } ], 
                                       'expression': '<%= ds_tipo_curso %>'  }
                  ]
    }

    var getFieldHeaderValue = function(data) { 
        $scope.headers = getFieldValue(data, $scope.report.cabecalho.fields); 
        //console.log($scope.report.data, $scope.headers);

        var groups = getFieldsGroup($scope.report.cabecalho.fields);     
        // $scope.links = getLinkValue($scope.report.data, groups);
        //console.log(1, $scope.links);
    }  

    // DETAILS

    $scope.report.detalhe = {
        'fields': [ 
                    { 'name': 'Série', 'key': ['cd_curso_instituicao'], 
                                       'value': [ { 'field': 'cd_curso_instituicao' }, { 'field': 'nm_curso' } ], 
                                       'expression': '<%= cd_curso_instituicao %> - <%= nm_curso %>' },
                    { 'name': 'Ano/Semestre', 'key': ['nr_ano', 'nr_semestre'], 
                                              'value': [ { 'field': 'nr_ano' }, { 'field': 'nr_semestre' } ], 
                                              'expression': '<%= nr_ano %> / <%= nr_semestre %>' },
                    { 'name': 'Aluno', 'key': ['cd_aluno'], 
                                       'value': [ { 'field': 'nm_aluno' } ], 
                                       'expression': '<%= nm_aluno %>' },
                    { 'name': 'Vencimento', 'key': ['dt_vencimento'], 
                                            'value': [ { 'field': 'dt_vencimento', 'filter': ['date', 'dd/MM/yyyy'] } ], 
                                            'expression': '<%= dt_vencimento %>' },
                    { 'name': 'Pagamento', 'key': ['dt_pagamento'], 
                                           'value': [ { 'field': 'dt_pagamento', 'filter': ['date', 'dd/MM/yyyy'] } ], 
                                           'expression': '<%= dt_pagamento %>' },
                    { 'name': 'Valor', 'key': ['previsao_confirmado'], 
                                       'value': [ { 'field': 'previsao_confirmado', 'filter': ['currency', 'R$ '] } ], 
                                       'expression': '<%= previsao_confirmado %>' }
                  ]
    }

    var getFieldDetailValue = function(data) {         
        $scope.details = _.map(data, function(item, key) {
            return getFieldValue(item, $scope.report.detalhe.fields);  
        });  
        $scope.details.header = $scope.details[0];
    }

    // FOOTER

    $scope.report.rodape = {
        'fields': [ 
                    { 'name': 'Série', 'key': ['cd_curso_instituicao'], 
                                       'value': [ { 'field': 'cd_curso_instituicao' }, { 'field': 'nm_curso' } ], 
                                       'expression': '<%= cd_curso_instituicao %> - <%= nm_curso %>' },
                    { 'name': 'Ano/Semestre', 'key': ['nr_ano', 'nr_semestre'], 
                                              'value': [ { 'field': 'nr_ano' }, { 'field': 'nr_semestre' } ], 
                                              'expression': '<%= nr_ano %> / <%= nr_semestre %>' },
                    { 'name': 'Aluno', 'key': ['cd_aluno'], 
                                       'value': [ { 'field': 'nm_aluno' } ], 
                                       'expression': '<%= nm_aluno %>' }
                  ],
        'groups': [ 
                    { 'name': 'Valor', 'key': ['previsao_confirmado'], 
                                       'value': [ { 'field': 'previsao_confirmado', 'filter': ['currency', 'R$ '] } ], 
                                       'expression': '<%= previsao_confirmado %>',
                                       'filter': 'sum' }
                  ]
    }

    var getFieldFooterValue = function(data) {      
        var footers = DataGrouper.report(data, getFieldsGroup($scope.report.rodape.fields), 
            getFieldsGroup($scope.report.rodape.groups)); 

        $scope.footers = [];
        _.map(footers, function(item) {
            var sums = getFieldValue(item.sum, $scope.report.rodape.groups);
            var fields = getFieldValue(item.key, $scope.report.rodape.fields);
            $scope.footers.push(_.union(fields, sums));
        });
        $scope.footers.header = $scope.footers[0];
    }

    // DATA GROUPER

    DataGrouper

    

    getData(index);  

  });
