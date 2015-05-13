'use strict';

app.controller('ReportCtrl', function ($scope, ReportService, JsonService) {
	
	$scope.list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	$scope.dadosteste = {"status": "R", "aluno": "Nome do Aluno", "vencimento": "08/05/2015", "pagamento": "08/05/2015", "valor": "100,00"}
    $scope.report = {
        titulo: 'Relatário de Movimentação Financeira',
        cabecalho: {},
        detalhe: {},
        rodape: {}
    };


    // HEADER

    $scope.links = [];
    $scope.headers = [];

    $scope.report.cabecalho = {
        'fields': [ 
                    { 'field': { 'name': 'Instituição', 'key': ['cd_instituicao_ensino', 'nm_instituicao_ensino'], 'value': ['nm_instituicao_ensino'] } },
                    { 'field': { 'name': 'Curso', 'key': ['cd_tipo_curso', 'ds_tipo_curso'], 'value': ['ds_tipo_curso'] } },
                    { 'field': { 'name': 'Série', 'key': ['cd_curso', 'cd_curso_instituicao', 'nm_curso'], 'value': ['cd_curso_instituicao', ' - ', 'nm_curso'] } },
                    { 'field': { 'name': 'Ano/Semestre', 'key': ['nr_ano', 'nr_semestre'], 'value': ['nr_ano', ' / ', 'nr_semestre'] } }
                  ]
    }

    var getFieldHeaderGroup = function() {
        ReportService.movimentoByHeader(getFieldsHeader())
            .then( function(data) {
                $scope.report.cabecalho.values = data;
                setFieldHeaderLink(0);
                setFieldHeaderValue(0);
            })
            .catch( function(err) {
                return console.log(err);
            });
    }

    var getFieldsHeader = function() {
        var fields = _.pluck($scope.report.cabecalho.fields, 'field');
        var headers = [];
        _.map(fields, function(field, index) {
            _.map(field.key, function(key, index) {
                headers.push(key);  
            }); 
        }); 
        return headers;
    }

    var setFieldHeaderLink = function(index) {   
        var values = $scope.report.cabecalho.values;  
        _.map(values, function(value, key) {
            $scope.links[key] = { name: getFieldHeaderValue(key, value) };
        });        
    }

    var setFieldHeaderValue = function(index) {        
        var fields = _.pluck($scope.report.cabecalho.fields, 'field');
        _.map(fields, function(field, key) {
            $scope.headers[key] = { name: field.name, value: getFieldHeaderValue(index, field.value) };
        });        
    }

    var getFieldHeaderValue = function(index, fields) {
        var valueFormat = '';
        var value = $scope.report.cabecalho.values[index];
        _.map(fields, function(field) {
            var property = _.property(field)(value);
            if(_.isUndefined(property)) { valueFormat += field; } 
            else { valueFormat += property; }
        });
        return valueFormat;
    }

    getFieldHeaderGroup();

  });
