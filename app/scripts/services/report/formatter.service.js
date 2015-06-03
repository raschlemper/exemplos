app.factory("ReportFormatterService", function($filter, DataGrouperService) {

    

    

    var getFieldValueFields = function(component, value) {
        var fields = component.data.fields;
        return getFieldsValue(value, fields);
    }

    var getFieldValueGroups = function(component, value) {
        var fields = component.data.groups;
        return getFieldsValue(value, fields);
    }

    var orderRow = function(row) {
        return _.sortBy(row, function(item) {
            return item.order;
        })
    }

    var formatObject = function(row) {
        return { 'columns': orderRow(row) }
    }

    var formatWithoutFields = function(component) {   
        var rows = [];     
        rows.push(component.values);
        return rows;
    }

    var formatFields = function(component) {
        var rows = [];
        _.map(component.values, function(value, index) {
            var fieldsRows = getFieldValueFields(component, value);
            rows.push(formatObject(fieldsRows));
        });
        return rows;
    }

    var formatGroups = function(component) {
        var rows = [];
        _.map(component.values, function(value, index) {
            var groupsRows = getFieldValueGroups(component, value);
            var fieldsRows = getFieldValueFields(component, value);
            var row = _.union(groupsRows, fieldsRows);
            rows.push(formatObject(row));
        });
        return rows;
    }

    var formatLinks = function(pages) {
        return _.map(pages, function(page) {  
            page.link = getFieldValue(page.filters, page.field);
            return page;
        });
    }












    var getExpressionValue = function(registers, expression) {
        var template = _.template(expression);
        var result = template(registers);
        return result;
    }

    var applyFilter = function(registers, field) {
        return _.map(field.value, function(item, key) {
            if (!item.filter) return;
            if (item.filter.length == 2) {
                registers[item.field] = $filter(item.filter[0])(registers[item.field], item.filter[1]);
            } else if (item.filter.length == 3) {
                registers[item.field] = $filter(item.filter[0])(registers[item.field], item.filter[1], item.filter[2]);
            }
        });
    }

    var getFieldValue = function(registers, field) {
        applyFilter(registers, field);
        return {
            name: field.name,
            value: getExpressionValue(registers, field.expression),
            order: field.order
        };
    }

    var getFieldsValue = function(registers, fields) {
        registersFormat = angular.copy(registers);
        return _.map(fields, function(field, key) {
            return getFieldValue(registersFormat, field)
        });
    }

    var formatField = function(registers, field) {
        return getFieldValue(registers, field);
    }

    var formatFields = function(registers, fields) {
        return getFieldsValue(registers, fields);
    }

    return {
        formatField: formatField,
        formatFields: formatFields
    }
});