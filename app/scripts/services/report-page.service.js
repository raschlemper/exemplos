app.factory("ReportPageService", function(DataGrouperService, ReportFunctionService) {

    var getReportFilter = function(components) {
        var headerComponents = _.where(components, {
            'containerType': 'header'
        });
        return _.reduce(headerComponents, function(memo, component) {
            if (component.data) {
                return _.union(memo, component.data.fields);
            }
        }, []);
    }

    var getFieldsFilter = function(components) {
    	var filter = getReportFilter(components);
        var values = _.pluck(filter, 'value');
        return _.reduce(values, function(memo, value) {
            return _.union(memo, _.pluck(value, 'field'));
        }, []);
    }

    var getPages = function(registers, components) {
        var fieldsFilter = getFieldsFilter(components);
        return DataGrouperService.keys(registers, fieldsFilter);
    }


    var applyFilter = function(page, registers) {
        if(!page) { return registers; }
        return _.where(registers, page);
    }

    var page = function(page, registers) {
        var registersByFilter = applyFilter(page, registers);
        return registersByFilter;
    };

    return {
    	pages: getPages,
    	page: page
    }

});