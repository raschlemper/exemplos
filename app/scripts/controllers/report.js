'use strict';

app.controller('ReportCtrl', function ($scope, $filter, $routeParams, $location, 
        ReportService, MovimentoService, ReportComponentService, ReportFormatterService, VisioService, 
        JsonService) {
	
	var index = 0;
    var registers = [];
    var visio = {};
    $scope.visio = {};
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
        VisioService.getByHashid($routeParams.hashid)
            .then( function(data) {  
                visio = data[0];
                $scope.visio = visio;
                $scope.report = ReportService.create(registers, visio.layout); 
                $scope.getPage(index);  
            })
            .catch( function(err) {
                layout = [];
            });
    }

    $scope.getPage = function(index) {
        var page = $scope.report.pages[index];
        var registersByFilter = applyFilter(page);
        ReportComponentService.create(registersByFilter, $scope.report.components);
        ReportFormatterService.format($scope.report.components);

        console.log($scope.report);
    }

    var applyFilter = function(page) {
        if(!page) { return registers; }
        return _.where(registers, page);
    }

    $scope.getWidget =function(code) {
        var widget = _.findWhere($scope.report.components, {'code': code});
        return createWidget(widget);
    }

    var createWidget = function(widget) {
        switch(widget.type) {
            case "image":
                return '<img src="' + widget.data.path + '"/>';
                break;
            case "list":
                return createList(widget);
                break;
            default:
                return '';
        }
    }

    var createList = function(widget) {
        var html =  '<div class="row">';
        _.map(widget.data.fields, function(field) {
            html += '<div class="col-lg-12">' + field + ':</div>';
        })
        html += '</div>'; 
        return html;
    }

    createReport();    

  });
