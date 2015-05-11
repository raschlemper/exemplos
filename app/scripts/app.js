'use strict';

/**
 * @ngdoc overview
 * @name exemplosApp
 * @description
 * # exemplosApp
 *
 * Main module of the application.
 */


var app = angular.module('exemplosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);


app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/configuration', {
        templateUrl: 'views/configuration.html',
        controller: 'ConfigurationCtrl'
      })
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      .when('/preview', {
        templateUrl: 'views/preview.html',
        controller: 'PreviewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.interceptors.push('menuInterceptor');
  })

  .factory('menuInterceptor', function ($location) {
    return {
      // Active menu
      request: function (config) {
        config.headers = config.headers || {};
        var menu = $location.path();
        chooseMenu(menu);
        return config;
      }
    };
  })

function chooseMenu(menu) {
  var menus = angular.element("#menu").children();
  for(var i=0; i<menus.length; i++) {
    var elementMenu = angular.element(menus[i]);
    var link = angular.element(elementMenu).children();    
    var href = (angular.element(link).attr('href')).replace('#','');
    if(menu === href) { angular.element(elementMenu).addClass('active'); }
    else { angular.element(elementMenu).removeClass('active'); }
  }
}
