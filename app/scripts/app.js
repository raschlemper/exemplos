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
    'ngTouch',
    'ngLocale',
    'ui.bootstrap',
    'blockUI',
    'ngToast'
  ]);


app.config(['$routeProvider', '$locationProvider', '$httpProvider', 'blockUIConfig', function ($routeProvider, $locationProvider, $httpProvider, blockUIConfig) {
    // $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost';
    // $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = ['GET, POST, OPTIONS, PUT, PATCH, DELETE'];
    // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type';
    // $httpProvider.defaults.headers.common['Access-Control-Allow-Credentials'] = true;

    blockUIConfig.message = 'Carregando...';
    blockUIConfig.delay = 2000;

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/configuration', {
        templateUrl: 'views/configuration.html',
        controller: 'ConfigurationCtrl'
      })
      .when('/report/new', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      .when('/report', {
        templateUrl: 'views/report/report.html',
        controller: 'ReportNewCtrl'
      })
      .when('/preview', {
        templateUrl: 'views/preview.html',
        controller: 'PreviewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.interceptors.push('menuInterceptor');
  }])

  .factory('menuInterceptor', ['$location', function ($location) {
    return {
      // Active menu
      request: function (config) {
        config.headers = config.headers || {};
        var menu = $location.path();
        chooseMenu(menu);
        return config;
      }
    };
  }])

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
