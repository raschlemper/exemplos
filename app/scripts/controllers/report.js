'use strict';

app.controller('ReportCtrl', function ($scope, $filter, $routeParams, $location, 
        ReportService, MovimentoService, VisioService, LayoutService, JsonService) {
	
	var index = 0;
    var registers = [];
    var visio = [];
    var layout = [];
    $scope.report = {};
    

    var createReport = function() {
        if(!$routeParams.hashid) { 
            $location.url('/report').search('hashid', '555b2523a209f0690f4c7ff7'); 
        }
        getData();
    }

    var getData = function() {
        MovimentoService.movimento()
            .then( function(data) { 
                registers = data; 
                getVisio(); 
            })
            .catch( function(err) {
                data = [];
            });
    }   

    var getVisio = function() {
        VisioService.service.getByHashid($routeParams.hashid)
            .then( function(data) {  
                visio = data[0];
                getLayout(visio.layout);
            })
            .catch( function(err) {
                layout = [];
            });
    }

    var getLayout = function(layout) {
        LayoutService.service.getById(layout)
            .then( function(data) {  
                layout = data;
                $scope.report = ReportService.create(registers, data);    
                $scope.getPage(index);  

                console.log($scope.report);
            })
            .catch( function(err) {
                layout = [];
            });
    }  

    $scope.getPage = function(index) {
        var page = $scope.report.pages[index];
        //console.log(index, page);
    }

    // var getFieldsToLayout = function(fields) {
    //     filterTo(fields);
    //     _.map($scope.report.layout.containers, function(container) {
    //         _.map(container.components, function(component) {
    //             fieldsTo(component, fields);
    //             groupsTo(component, fields);
    //         });
    //     })
    // }

    // var filterTo = function(fields) {
    //     var data = $scope.report.layout.filter;
    //     var list = _.map(data, function(item) { return fields[item]; })
    //     if(fields.length > 0) { layout.filter = list; }
    // }

    // var fieldsTo = function(component, fields) {
    //     var data = component.fields;
    //     var list = _.map(data, function(item) { return fields[item]; })
    //     if(fields.length > 0) { component.fields = list; }
    // }

    // var groupsTo = function(component, fields) {
    //     var data = component.groups;
    //     var list = _.map(data, function(item) { return fields[item]; })
    //     if(fields.length > 0) { component.groups = list; }
    // }

    createReport();

    // $scope.get$scope.report = function(index) {
    //     getFieldHeaderValue($scope.$scope.report.data[index].key);
    //     getFieldDetailValue($scope.$scope.report.data[index].vals);
    //     getFieldFooterValue($scope.$scope.report.data[index].vals);
    //     getFieldRestValue($scope.$scope.report.data[index].vals);
    // }

    // var getData$scope.report = function(data) {
    //     var groups = getFieldsGroup($scope.$scope.report.cabecalho.fields);        
    //     return DataGrouperService.$scope.report(data, groups); 
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
    //     $scope.pages = _.map($scope.$scope.report.data, function(item) {
    //         return item.key;
    //     });
    // } 

    // var field = function(field) {
    //     if(fields.length === 0) { fields = getFields(); }
    //     return fields[field];
    // }

    // // HEADER

    // $scope.$scope.report.cabecalho = {
    //     'fields': [ field('instituicao'), field('curso'), field('serie') ]
    // }

    // var getFieldHeaderValue = function(data) { 
    //     $scope.headers = getFieldValue(data, $scope.$scope.report.cabecalho.fields); 
    // }  

    // // DETAILS

    // $scope.$scope.report.detalhe = {
    //     'fields': [ field('ano'), field('aluno'), field('vencimento'), field('pagamento'), field('valor') ]
    // }

    // var getFieldDetailValue = function(data) {         
    //     $scope.details = _.map(data, function(item, key) {
    //         return getFieldValue(item, $scope.$scope.report.detalhe.fields);  
    //     });  
    //     $scope.details.header = $scope.details[0];
    // }

    // // FOOTER

    // $scope.$scope.report.rodape = {
    //     'fields': [ field('ano'), field('aluno') ],
    //     'groups': [ field('valor') ]
    // }

    // var getFieldFooterValue = function(data) {   
    //     var footers = DataGrouperService.sum(data, getFieldsGroup($scope.$scope.report.rodape.fields), 
    //         getFieldsGroup($scope.$scope.report.rodape.groups)); 
    //     $scope.footers = unionGroupFooter(footers);
    //     $scope.footers.header = $scope.footers[0];
    // }    

    // var unionGroupFooter = function(dataGrouper) {
    //     return _.map(dataGrouper, function(item) {
    //         var fields = getFieldValue(item.key, $scope.$scope.report.rodape.fields);
    //         var sums = getFieldValue(item.key, $scope.$scope.report.rodape.groups);
    //         return _.union(fields, sums);
    //     });
    // }

    // // REST

    // $scope.$scope.report.saldo = {
    //     'fields': [ field('ano'), field('aluno') ],
    //     'groups': [ field('saldo') ]
    // }

    // var getFieldRestValue = function(data) {   
    //     var rests = DataGrouperService.rest(data, getFieldsGroup($scope.$scope.report.saldo.fields), 
    //         getFieldsGroup($scope.$scope.report.saldo.groups)); 
    //     $scope.rests = getListFieldValue(rests[index], $scope.$scope.report.saldo.groups)
    //     $scope.rests.header = $scope.rests[0];
    // }      

    // var unionGroupRest = function(dataGrouper) {
    //     return _.map(dataGrouper, function(item) {
    //         return getListFieldValue(item, $scope.$scope.report.saldo.groups);
    //     });
    // } 

    

  });
