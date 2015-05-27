'use strict';

app.controller('ReportCtrl', function ($scope, $filter, $routeParams, $location, 
        ReportService, MovimentoService, ReportComponentService, ReportFormatterService, VisioService, 
        JsonService) {
	
    var index = 0;
    var registers = [];
    var visio = {};

    var createReport = function() {
/*        if(!$routeParams.hashid) { 
            $location.url('/report').search('hashid', '555b2523a209f0690f4c7ff7'); 
        }*/
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

        // VisioService.service.getByHashid($routeParams.hashid)
        JsonService.visioTest()
            .then( function(data) {  
                visio = data[0];
                ReportService.create(registers, visio.layout); 
                $scope.getPage(index);  

                console.log(visio.layout);
            })
            .catch( function(err) {
                layout = [];
            });
    }

    $scope.getPage = function(index) {
        // var page = $scope.report.pages[index];
        // var registersByFilter = applyFilter(page);
        // ReportComponentService.create(registersByFilter, $scope.report.components);
        // ReportFormatterService.format($scope.report.components);

        // console.log($scope.report);
    }

    var applyFilter = function(page) {
        if(!page) { return registers; }
        return _.where(registers, page);
    }

    createReport();    

  });
