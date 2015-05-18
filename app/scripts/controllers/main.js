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

    $scope.visios = [];
    /*VisioService.service.getAll();*/
    var getVisios = function() {
        VisioService.service.getAll()
            .then(function(data) {
                $scope.visios = data;
            })
            .catch(function(err) {
                return console.log(err);
            });
    };
    getVisios();
});
