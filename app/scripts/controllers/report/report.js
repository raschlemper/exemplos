'use strict';

app.controller('ReportCtrl', function($scope, $routeParams, ReportService, MovimentoService, VisioService, JsonService) {

    var index = 0;
    var registers = [];
    var visio = {};
    $scope.pages = [];
    $scope.visio = {};

    var createReport = function() {
        getData();
    }

    var getData = function() {
        MovimentoService.movimento()
            .then(function(data) {
                registers = data;
                getVisio();
            })
            .catch(function(err) {
                data = [];
            });
    }

    var getVisio = function() {
        // VisioService.service.getByHashid($routeParams.hashid)
        JsonService.visioTest()
            .then(function(data) {
                visio = data[0];  
                $scope.pages = ReportService.pages(registers, angular.copy(visio));
                $scope.getPage($scope.pages[index]);
                console.log('pages', $scope.pages);
            })
            .catch(function(err) {
                layout = [];
            });
    }

    $scope.getPage = function(page) {  
        // ReportService.page(registers, angular.copy(visio), page);
    }

    createReport();

});

