'use strict';

app.controller('ReportCtrl', function ($scope, ReportService, JsonService) {
	
	// $scope.list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	// $scope.dadosteste = {"status": "R", "aluno": "Nome do Aluno", "vencimento": "08/05/2015", "pagamento": "08/05/2015", "valor": "100,00"}
    
    $scope.report = {
        titulo: 'Relatário de Movimentação Financeira',
        cabecalho: {},
        detalhe: {},
        rodape: {}
    };

    $scope.links = [];
    $scope.headers = [];
    $scope.details = [];

    var getData = function(index) {
        ReportService.movimento()
            .then( function(data) {
                getDataReport(data);
                getFieldHeaderValue($scope.report.data[index].key);
                getFieldDetailValue($scope.report.data[index].vals);
                //console.log($scope.details[0]) ; 
            })
            .catch( function(err) {
                return console.log(err);
            });
    }

    var getDataReport = function(data) {
        var groups = getFieldsGroup();        
        $scope.report.data = DataGrouper.report(data, groups); 
    }

    var getFieldsGroup = function() {
        var groups = [];
        _.map($scope.report.cabecalho.fields, function(field, index) {
            _.map(field.value, function(value, index) {
                groups.push(value);  
            }); 
        }); 
        return groups;
    }

    var getFieldValue = function(data, fields) {       
        return _.map(fields, function(field, key) {
            return { name: field.name, value: getExpressionValue(data, field.expression) };
        });        
    }    

    var getExpressionValue = function(data, expression) {
        var template = _.template(expression);
        return template(data);
    }

    // HEADER

    $scope.report.cabecalho = {
        'fields': [ 
                    { 'name': 'Instituição', 'key': ['cd_instituicao_ensino'], 
                                             'value': ['nm_instituicao_ensino'], 
                                             'expression': '<%= nm_instituicao_ensino %>' },
                    { 'name': 'Curso', 'key': ['cd_tipo_curso'], 
                                       'value': [ 'ds_tipo_curso'], 
                                       'expression': '<%= ds_tipo_curso %>' },
                    { 'name': 'Série', 'key': ['cd_curso_instituicao'], 
                                       'value': ['cd_curso_instituicao', 'nm_curso'], 
                                       'expression': '<%= cd_curso_instituicao %> - <%= nm_curso %>' },
                    { 'name': 'Ano/Semestre', 'key': ['nr_ano', 'nr_semestre'], 
                                              'value': ['nr_ano', 'nr_semestre'], 
                                              'expression': '<%= nr_ano %> / <%= nr_semestre %>' }
                  ]
    }

    var getFieldHeaderValue = function(data) { 
        $scope.headers = getFieldValue(data, $scope.report.cabecalho.fields);    
    }  

    // DETAILS

    $scope.report.detalhe = {
        'fields': [ 
                    { 'name': 'Aluno', 'key': ['cd_aluno'], 
                                       'value': ['nm_aluno'], 
                                       'expression': '<%= nm_aluno %>' },
                    { 'name': 'Vencimento', 'key': ['dt_vencimento'], 
                                            'value': [ 'dt_vencimento'], 
                                            'expression': '<%= dt_vencimento %>' },
                    { 'name': 'Pagamento', 'key': ['dt_pagamento'], 
                                           'value': ['dt_pagamento'], 
                                           'expression': '<%= dt_pagamento %>' },
                    { 'name': 'Valor', 'key': ['previsao_nao_confirmado'], 
                                       'value': ['previsao_nao_confirmado'], 
                                       'expression': 'R$ <%= previsao_nao_confirmado %>' }
                  ]
    }

    var getFieldDetailValue = function(data) {         
        var details = _.map(data, function(item, key) {
            return getFieldValue(item, $scope.report.detalhe.fields);  
        });  
        $scope.details.header = details[0];
        $scope.details.body = details;  
    }

    // DATA GROUPER

    var DataGrouper = (function() {
        var has = function(obj, target) {
            return _.any(obj, function(value) {
                return _.isEqual(value, target);
            });
        };

        var keys = function(data, names) {
            return _.reduce(data, function(memo, item) {
                var key = _.pick(item, names);
                if (!has(memo, key)) {
                    memo.push(key);
                }
                return memo;
            }, []);
        };

        var group = function(data, names) {
            var stems = keys(data, names);
            return _.map(stems, function(stem) {
                return {
                    key: stem,
                    vals:_.map(_.where(data, stem), function(item) {
                        return _.omit(item, names);
                    })
                };
            });
        };

        group.register = function(name, converter) {
            return group[name] = function(data, names) {
                return _.map(group(data, names), converter);
            };
        };

        return group;
    }());

    DataGrouper.register("report", function(item) {
        return item;
    });  

    getData(1);  

















    /*var getFieldHeaderGroup = function() {
        ReportService.movimentoByHeader(getFieldsGroup())
            .then( function(data) {
                $scope.report.cabecalho.values = data;
                setFieldHeaderLink(0);
                setFieldHeaderValue(0);
            })
            .catch( function(err) {
                return console.log(err);
            });
    }

    var setFieldHeaderLink = function(index) {   
        var values = $scope.report.cabecalho.values;  
        _.map(values, function(value, key) {
            $scope.links[key] = { name: getFieldHeaderValue(key, value) };
        });        
    }

    var setFieldHeaderValue = function(index) {        
        var fields = _.pluck($scope.report.cabecalho.fields, 'field');
        _.map(fields, function(field, key) {
            $scope.headers[key] = { name: field.name, value: getFieldHeaderValue(index, field.value) };
        });        
    }

    var getFieldHeaderValue = function(index, fields) {
        var valueFormat = '';
        var value = $scope.report.cabecalho.values[index];
        _.map(fields, function(field) {
            var property = _.property(field)(value);
            if(_.isUndefined(property)) { valueFormat += field; } 
            else { valueFormat += property; }
        });
        return valueFormat;
    }

    getFieldHeaderGroup();*/

  });
