'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exemplosApp
 */
app.controller('MainCtrl', function ($scope, $location, VisioService) {

	$scope.newVisio = function(){
 		$location.path("/configuration");
	};

	$scope.visios = VisioService.service.getAll();
    
  });
