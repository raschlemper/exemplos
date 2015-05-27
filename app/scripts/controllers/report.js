'use strict';

app.controller('ReportCtrl', function($scope, $filter, $routeParams, $location,
    ReportService, MovimentoService, VisioService,
    JsonService) {

    var index = 0;
    var registers = [];
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
                $scope.visio = data[0];
                $scope.pages = ReportService.pages(registers, $scope.visio.layout);
                $scope.getPage(index);
            })
            .catch(function(err) {
                layout = [];
            });
    }

    $scope.getPage = function(index) {
        var page = $scope.pages[index];
        ReportService.page(page, registers, $scope.visio.layout);
        console.log($scope.visio.layout);
    }

    createReport();

});
