'use strict';

/**
 * @ngdoc overview
 * @name exemplosApp
 * @description
 * # exemplosApp
 *
 * Main module of the application.
 */
angular
  .module('exemplosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/configuration', {
        templateUrl: 'views/configuration.html',
        controller: 'ConfigurationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
