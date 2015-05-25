app.factory("ReportComponentService", function(DataGrouperService, ReportFunctionService) {

    var createRow = function(register, result) {
    	return _.extend(register.key, result);  
    }

    var createRowGroup = function(data, registers) {
    	var rows = [];
        _.map(data.groups, function(field) {
        	var formula = field.formula;   
        	_.map(registers, function(register) {
        	  	var result = ReportFunctionService.calculate(formula, 
        	  		["previsao_confirmado"], register);
            	rows.push(createRow(register, result));	
        	})
        });
        return rows;
    }

    var groupRegister = function(registers, data) {
        var fields = getFields(_.pluck(data.fields, 'value'));
        return DataGrouperService.group(registers, fields);
    }

    var getFields = function(values) {
        var fields = [];
        _.map(values, function(value) {
            fields = _.union(fields, _.pluck(value, 'field'));
        });
        return fields;
    }

    var getData = function(component) {
        return {
            fields: component.data.fields,
            groups: component.data.groups
        }
    }

    var createComponentGroup = function(registers, component) {
        if (!component.data.groups) {
            return;
        }
        var data = getData(component);
        var groupers = groupRegister(registers, data);
        return createRowGroup(data, groupers);
    }

    var create = function(registers, components) {
        _.map(components, function(component) {
            component['rows'] = createComponentGroup(registers, component);
        });
    }

    return {
        create: create
    }
});