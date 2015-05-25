app.factory("ReportFunctionService", function(DataGrouperService) {

    var sum = function(values, field) {
        return _.reduce(values[field], function(memo, value) {
            return memo + value;
        });
    }
	
    var getValues = function(register, field) {
    	var values = {};
    	// _.map(registers, function(register) {
    		values[field] = _.pluck(register.vals, field);
    	// });	
        return values;
    }

    var calculateFormula = function(fields, register, formulaCallback) {
    	var result = {};
    	_.map(fields, function(field) {
        	var values = getValues(register, field);
			result[field] = formulaCallback(values, field);
    	});
    	return result;
    }

    var formulaFactory = function(formula) {
    	switch(formula) {
            case "sum":
                return sum;
                break;
            default:
                return '';
        }
    }

    var calculate = function(formula, fields, register) {
    	var funct = formulaFactory(formula);
        var result = calculateFormula(fields, register, funct);
    	return result;
    }

    return {
        calculate: calculate
    }
});