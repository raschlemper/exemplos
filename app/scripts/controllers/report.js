'use strict';

angular.module('exemplosApp')
  .controller('ReportCtrl', function ($scope) {

    angular.element("#report").addClass('active');

  	var cabecalho = [
    	{ 'name' : '1 Coluna', 'column' : 1 },    	
    	{ 'name' : '2 Colunas', 'column' : 2 },    	
    	{ 'name' : '3 Colunas', 'column' : 3 }
    ];

    var detalhe = [
    	{ 'name' : '1 Coluna', 'column' : 1 }
    ];

    var rodape = [
    	{ 'name' : '1 Coluna', 'column' : 1, 'size': [100] },    	
    	{ 'name' : '2 Colunas', 'column' : 2, 'size': [40,60] },    	
    	{ 'name' : '3 Colunas', 'column' : 3, 'size': [50,20,30] }
    ];

    $scope.option = {
    	'cabecalho': cabecalho,
    	'detalhe': detalhe,
    	'rodape': rodape
    };

    $scope.option.selection = {
    	'cabecalho': cabecalho[0],
    	'detalhe': detalhe[0],
    	'rodape': rodape[0]
    };

  });
