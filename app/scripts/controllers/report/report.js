'use strict';

app.controller('ReportCtrl', function($scope, $routeParams, ReportService, MovimentoService, VisioService, JsonService) {

    var index = 1;
    var registers = [];
    var visio = {};
    $scope.links = [];
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
                $scope.links = ReportService.pages(registers, angular.copy(visio));
                $scope.getLink($scope.links[index]);
                $scope.getPage($scope.pages[index]);
                console.log('pages', $scope.links, $scope.pages);
            })
            .catch(function(err) {
                layout = [];
            });
    }

    $scope.getLink = function(link) {  
        $scope.pages = link.field;
    }

    $scope.getPage = function(page) {  
        //ReportService.page(registers, angular.copy(visio), page);
    }

    createReport();

});

