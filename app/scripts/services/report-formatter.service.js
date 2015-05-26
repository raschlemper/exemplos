app.factory("ReportFormatterService", function(DataGrouperService) {

    var getFieldValue = function(data, fields) {
        dataFormat = angular.copy(data);
        return _.map(fields, function(field, key) {
            applyFilter(dataFormat, field);
            return {
                name: field.name,
                value: getExpressionValue(dataFormat, field.expression),
                order: field.order
            };
        });
    }

    var applyFilter = function(data, field) {
        return _.map(field.value, function(item, key) {
            if (!item.filter) return;
            if (item.filter.length == 2) {
                data[item.field] = $filter(item.filter[0])(data[item.field], item.filter[1]);
            } else if (item.filter.length == 3) {
                data[item.field] = $filter(item.filter[0])(data[item.field], item.filter[1], item.filter[2]);
            }
        });
    }

    var getExpressionValue = function(data, expression) {
        var template = _.template(expression);
        var result = template(data);
        return result;
    }

    var getFieldValueFields = function(component, value) {
        var fields = component.data.fields;
        return getFieldValue(value, fields);
    }

    var getFieldValueGroups = function(component, value) {
        var fields = component.data.groups;
        return getFieldValue(value, fields);
    }

    var createRowWithoutFields = function(component) {   
        var rows = [];     
        rows.push(component.values);
        return rows;
    }

    var orderRow = function(row) {
        return _.sortBy(row, function(item) {
            return item.order;
        })
    }

    var createObjectRow = function(row) {
        return { 'columns': orderRow(row) }
    }

    var createFieldsRow = function(component) {
        var rows = [];
        _.map(component.values, function(value, index) {
            var fieldsRows = getFieldValueFields(component, value);
            rows.push(createObjectRow(fieldsRows));
        });
        return rows;
    }

    var createGroupsRow = function(component) {
        var rows = [];
        _.map(component.values, function(value, index) {
            var groupsRows = getFieldValueGroups(component, value);
            var fieldsRows = getFieldValueFields(component, value);
            var row = _.union(groupsRows, fieldsRows);
            rows.push(createObjectRow(row));
        });
        return rows;
    }

    var createRow = function(component) {
        if(component.data.groups) {
            return createGroupsRow(component);
        }
        if(component.data.fields) { 
            return createFieldsRow(component);
        }
        return createRowWithoutFields(component);
    }

    var format = function(components) {
        _.map(components, function(component) {
            component['rows'] = createRow(component);
        });
    }

    return {
        format: format
    }
});