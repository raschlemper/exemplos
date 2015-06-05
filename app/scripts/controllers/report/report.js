'use strict';

app.controller('ReportNewCtrl', function($scope, $routeParams, ReportNewService, MovimentoService, VisioService, JsonService) {

    var index = 0;
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
                $scope.link = ReportNewService.links(registers, angular.copy(visio));
                // $scope.getPage($scope.pages[index]);
                console.log('links', $scope.link, $scope.pages);
            })
            .catch(function(err) {
                layout = [];
            });
    }

    $scope.getLink = function(value, index) {
        $scope.link = ReportNewService.link(value, index);
    }

    $scope.getPage = function(selected, value) {  
        console.log(selected, value);
    }

    createReport();

});

