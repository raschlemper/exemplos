app.factory("ReportFunctionService", function(DataGrouperService) {

    var sum = function(values, field) {
        return _.reduce(values[field], function(memo, value) {
            return memo + value;
        });
    }

    var rest = function(values, field) {
        return _.reduce(values[field], function(memo, value) {
            return memo + value;
        });
    }
	
    var getValues = function(register, field) {
    	var values = {};
    	values[field] = _.pluck(register, field);
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
            case "rest":
                return sum;
                break;
            default:
                return '';
        }
    }

    var calculate = function(formula, fields, register) {
    	var formulaFunction = formulaFactory(formula);
        var result = calculateFormula(fields, register, formulaFunction);
    	return result;
    }

    return {
        calculate: calculate
    }
});