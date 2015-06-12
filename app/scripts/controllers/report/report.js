'use strict';

app.controller('ReportNewCtrl', function($scope, $routeParams, ReportNewService, MovimentoService, VisioService, JsonService) {

    var index = 0;
    var registers = [];
    var visio = {};
    $scope.link = [];
    $scope.page = [];
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
        JsonService.visioLineTest()
            .then(function(data) {
                visio = data[0]; 
                $scope.getLinks();  
            })
            .catch(function(err) {
                layout = [];
            });
    }

    $scope.getLinks = function() { 
        $scope.link = ReportNewService.links(registers, visio);
        $scope.getLink($scope.link.selected[0], index);
    }

    $scope.getLink = function(key, index) {
        $scope.link = ReportNewService.link(key, index);              
        $scope.getPages($scope.link.selected, $scope.link.links[0]);
    }

    $scope.getPages = function(selected, link) {
        var filters = link.key;
        _.map(selected, function(item) {
            _.extend(filters, item);
        });
        $scope.page = ReportNewService.pages(registers, visio, filters);
        $scope.getPage($scope.page.pages, filters);
    }

    $scope.getPage = function(page) {
        $scope.visio = ReportNewService.page(angular.copy(visio), page);
    }

    createReport();

});

