'use strict';

app.controller('ReportCtrl', function ($scope, $filter, MovimentoService, ReportService, DataGrouperService, JsonService) {
	
	var index = 1;
    var data = [];
    var fields = [];
    var report = {
        titulo: 'Relatário de Movimentação Financeira',
        layout: []
    };

    // $scope.headers = [];
    // $scope.details = [];
    // $scope.footers = [];
    // $scope.rest = [];
    // var fields = [];
    // var dataFormat = null;

    // var layout = 

    // $scope.report = {
    //     titulo: 'Relatário de Movimentação Financeira',
    //     layout: layout
    // };

    var getData = function(index) {
        MovimentoService.movimento()
            .then( function(data) {   
                data = data;   
                getFields(); 
            })
            .catch( function(err) {
                data = [];
            });
    }      

    var getFields = function() {
        JsonService.camposTest()
            .then( function(data) {   
                fields = data;
                getLayout(); 
            })
            .catch( function(err) {
                fields = [];
            });
    }      

    var getLayout = function() {
        JsonService.layoutTest()
            .then( function(data) {   
                report.layout = data;
                getFieldsToLayout(report.layout);
            })
            .catch( function(err) {
                layout = [];
            });
    }

    var getFieldsToLayout = function(layout) {
        _.map(layout.containers, function(container) {
            _.map(container.components, function(component) {
                fieldsTo(component);
                groupsTo(component);
            });
        })
    }

    var fieldsTo = function(component) {
        var data = component.fields;
        var list = _.map(data, function(item) { return fields[item]; })
        if(fields.length > 0) { component.fields = list; }
    }

    var groupsTo = function(component) {
        var data = component.groups;
        var list = _.map(data, function(item) { return fields[item]; })
        if(fields.length > 0) { component.groups = list; }
    }

    getData(index);

    // $scope.getReport = function(index) {
    //     getFieldHeaderValue($scope.report.data[index].key);
    //     getFieldDetailValue($scope.report.data[index].vals);
    //     getFieldFooterValue($scope.report.data[index].vals);
    //     getFieldRestValue($scope.report.data[index].vals);
    // }

    // var getDataReport = function(data) {
    //     var groups = getFieldsGroup($scope.report.cabecalho.fields);        
    //     return DataGrouperService.report(data, groups); 
    // }

    // var getFieldsGroup = function(fields) {
    //     var groups = [];
    //     _.map(fields, function(field, index) {
    //         _.map(field.value, function(value, index) {
    //             groups.push(value.field);  
    //         }); 
    //     }); 
    //     return groups;
    // } 

    // var removeFieldsGroup = function(group, remove) {
    //     _.map(remove, function(item){ 
    //         group = _.without(group, item); 
    //     });
    //     return group;
    // } 

    // var getFieldValue = function(data, fields) {
    //     dataFormat = angular.copy(data);    
    //     return _.map(fields, function(field, key) {
    //         applyFilter(dataFormat, field);
    //         return { name: field.name, value: getExpressionValue(dataFormat, field.expression) };
    //     });        
    // }  

    // var getListFieldValue = function(item, fields) {
    //     var data = [];
    //     _.map(item.vals, function(value, index) {
    //         data.push(getFieldValue(value, fields));
    //     });
    //     return data;     
    // }  

    // var applyFilter = function(data, field) {
    //     return _.map(field.value, function(item, key) {
    //         if(!item.filter) return;
    //         if(item.filter.length == 2) {
    //             data[item.field] = $filter(item.filter[0])(data[item.field], item.filter[1]); 
    //         } else if(item.filter.length == 3) {
    //             data[item.field] = $filter(item.filter[0])(data[item.field], item.filter[1], item.filter[2]); 
    //         }                
    //     }); 
    // }  

    // var getExpressionValue = function(data, expression) {        
    //     var template = _.template(expression);
    //     var result = template(data);
    //     return result;
    // }

    // var getPageValue = function() {
    //     $scope.pages = _.map($scope.report.data, function(item) {
    //         return item.key;
    //     });
    // } 

    // var field = function(field) {
    //     if(fields.length === 0) { fields = getFields(); }
    //     return fields[field];
    // }

    // // HEADER

    // $scope.report.cabecalho = {
    //     'fields': [ field('instituicao'), field('curso'), field('serie') ]
    // }

    // var getFieldHeaderValue = function(data) { 
    //     $scope.headers = getFieldValue(data, $scope.report.cabecalho.fields); 
    // }  

    // // DETAILS

    // $scope.report.detalhe = {
    //     'fields': [ field('ano'), field('aluno'), field('vencimento'), field('pagamento'), field('valor') ]
    // }

    // var getFieldDetailValue = function(data) {         
    //     $scope.details = _.map(data, function(item, key) {
    //         return getFieldValue(item, $scope.report.detalhe.fields);  
    //     });  
    //     $scope.details.header = $scope.details[0];
    // }

    // // FOOTER

    // $scope.report.rodape = {
    //     'fields': [ field('ano'), field('aluno') ],
    //     'groups': [ field('valor') ]
    // }

    // var getFieldFooterValue = function(data) {   
    //     var footers = DataGrouperService.sum(data, getFieldsGroup($scope.report.rodape.fields), 
    //         getFieldsGroup($scope.report.rodape.groups)); 
    //     $scope.footers = unionGroupFooter(footers);
    //     $scope.footers.header = $scope.footers[0];
    // }    

    // var unionGroupFooter = function(dataGrouper) {
    //     return _.map(dataGrouper, function(item) {
    //         var fields = getFieldValue(item.key, $scope.report.rodape.fields);
    //         var sums = getFieldValue(item.key, $scope.report.rodape.groups);
    //         return _.union(fields, sums);
    //     });
    // }

    // // REST

    // $scope.report.saldo = {
    //     'fields': [ field('ano'), field('aluno') ],
    //     'groups': [ field('saldo') ]
    // }

    // var getFieldRestValue = function(data) {   
    //     var rests = DataGrouperService.rest(data, getFieldsGroup($scope.report.saldo.fields), 
    //         getFieldsGroup($scope.report.saldo.groups)); 
    //     $scope.rests = getListFieldValue(rests[index], $scope.report.saldo.groups)
    //     $scope.rests.header = $scope.rests[0];
    // }      

    // var unionGroupRest = function(dataGrouper) {
    //     return _.map(dataGrouper, function(item) {
    //         return getListFieldValue(item, $scope.report.saldo.groups);
    //     });
    // } 

    

  });
