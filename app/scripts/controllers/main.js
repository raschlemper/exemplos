'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exemplosApp
 */
app.controller('MainCtrl', function($scope, $location, VisioService) {

    $scope.newVisio = function() {
        $location.path("/configuration");
    };

    $scope.viewReport = function(visio) {
        $location.url('/report').search('hashid', visio.hashid);
    };

    $scope.updateVisio = function(visio) {
        $location.url('/configuration').search('hashid', visio.hashid);
    }

    $scope.visios = [];
    var getVisios = function() {
        VisioService.service.getAll()
            .then(function(data) {
                $scope.visios = data;
            })
            .catch(function(err) {
                return console.log(err);
            });
    };


    $scope.removeVisio = function(visio) {
        VisioService.service.remove(visio);
        getVisios();
    }

    var init = function() {
        getVisios();
    }();
});
