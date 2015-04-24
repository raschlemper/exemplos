'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
angular.module('exemplosApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
