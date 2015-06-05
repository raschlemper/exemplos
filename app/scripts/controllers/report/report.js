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
        VisioService.service.getByHashid($routeParams.hashid)
        // JsonService.visioTest()
            .then(function(data) {
                visio = data[0];  
                $scope.link = ReportNewService.links(registers, angular.copy(visio));
                $scope.getLink($scope.link.selected[0], 0);
                console.log('links', $scope.link, $scope.pages);
            })
            .catch(function(err) {
                layout = [];
            });
    }

    $scope.getLink = function(value, index) {
        $scope.link = ReportNewService.link(value, index);
        $scope.getPage($scope.link.selected, $scope.link.links[0]);
    }

    $scope.getPage = function(selected, link) {
        $scope.visio = angular.copy(visio);
        var page = { filters: link.key };
        _.map(selected, function(item) {
            _.extend(page.filters, item);
        })
        ReportNewService.page(page, registers, $scope.visio.layout);
        console.log(visio.layout);
    }

    createReport();

});

