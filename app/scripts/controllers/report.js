'use strict';

app.controller('ReportCtrl', function ($scope, $filter, ReportService, JsonService) {
	
	// $scope.list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	// $scope.dadosteste = {"status": "R", "aluno": "Nome do Aluno", "vencimento": "08/05/2015", "pagamento": "08/05/2015", "valor": "100,00"}
    
    var index = 0;

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
        var dataFormat = _.clone(data);      
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
                                       'value': [ { 'field': 'previsao_confirmado', 'filter': ['currency', 'R$ ', 0.00] } ], 
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
                                       'value': [ { 'field': 'previsao_confirmado', 'filter': ['currency', 'R$ ', 0.00] } ], 
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

        var vals = function(data, stem, names) {
            return _.map(_.where(data, stem), function(item) {
                return _.omit(item, names);
            });
        };

        var sum = function(values, names) {
            var data = [];
            _.map(names, function(name) {
                return data[name] = _.reduce(values, function(memo, item) {
                    return memo + Number(_.property(name)(item));
                }, 0); 
            });            
            return data;
        };

        var group = function(data, names, group_names) {
            var stems = keys(data, names);
            return _.map(stems, function(stem) {
                var val = vals(data, stem, names);
                var val_sum = [];
                if(sum) { val_sum = sum(val, group_names); }
                return {
                    key: stem,
                    vals: val,
                    sum: val_sum
                };
            });
        };

        group.register = function(name, converter) {
            return group[name] = function(data, names, group_names) {
                return _.map(group(data, names, group_names), converter);
            };
        };

        return group;
    }());

    DataGrouper.register("report", function(item) {
        return item;
    }); 

    getData(index);  

















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
