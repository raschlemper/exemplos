app.factory("ReportComponentService", function(DataGrouperService, ReportFunctionService) {

    var createRow = function(register, result) {
        if (!result) {
            return register.key;
        }
        return _.extend(register.key, result);
    }

    var getValues = function(field) {
        var values = {};
        values[field] = _.pluck(field.value, 'field');
        return values;
    }

    var applyFormula = function(field, register) {
        var formula = field.formula;
        return ReportFunctionService.calculate(formula, getValues(field), register.vals);
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

    var createComponentWithoutField = function(registers, component) {
        if (component.data.fields || component.data.groups) {
            return;
        }
        return component.data;
    }

    var createRowField = function(data, registers) {
        var rows = [];
        _.map(registers, function(register) {
            rows.push(createRow(register, null));
        });
        return rows;
    }

    var createComponentField = function(registers, component) {
        if (!component.data.fields) {
            return;
        }
        var data = getData(component);
        var groupers = groupRegister(registers, data);
        return createRowField(data, groupers);
    }

    var createRowGroup = function(data, registers) {
        var rows = [];
        _.map(data.groups, function(field) {
            _.map(registers, function(register) {
                var result = applyFormula(field, register);
                rows.push(createRow(register, result));
            });
        });
        return rows;
    }

    var createComponentGroup = function(registers, component) {
        if (!component.data.groups) {
            return;
        }
        var data = getData(component);
        var groupers = groupRegister(registers, data);
        return createRowGroup(data, groupers);
    }

    var createComponent = function(registers, component) {
        if (component.data.groups) {
            return createComponentGroup(registers, component);
        }
        if (component.data.fields) {
            return createComponentField(registers, component);
        }
        return createComponentWithoutField(registers, component);
    }

    var create = function(registers, components) {
        _.map(components, function(component) {
            component['values'] = createComponent(registers, component);
        });
    }

    return {
        create: create
    }
});