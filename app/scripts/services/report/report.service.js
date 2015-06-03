app.factory("ReportService", function(DataGrouperService, ReportPageService, ReportFormatterService) {

    var report = {     
    };

    /* **************************************************************************** */

    /* TODO: Colocar esta método no momento em que o layout esta sendo criado. */

    var orderBy = function(fields) {
        return _.sortBy(fields, function(item) {
            return item.order;
        })
    }

    var createComponents = function(container) {
        var components = [];
        _.map(container.components, function(component) {
            if(!component.data) { component.data = {}; }
            components.push({
                'containerType': container.type,
                'code': component._id,
                'type': component.type,
                'data': component.data
            });
        });
        return components;
    }

    var getComponents = function(layout) {
        var componentsList = [];
        _.map(layout.containers, function(container) {
            var components = createComponents(container);
            componentsList = _.union(componentsList, components);
        })
        return componentsList;
    }

    var getReportFilter = function(layout) {
        var components = getComponents(layout);
        var headerComponents = _.where(components, {
            'containerType': 'header'
        });
       var filters = _.reduce(headerComponents, function(memo, component) {
            if (component.data) {
                return _.union(memo, component.data.fields);
            }
        }, []);
        return orderBy(filters);
    }

    /* **************************************************************************** */

    var getValueFields = function(filters) { 
        var values = _.pluck(filters, 'value'); 
        return _.map(values, function(value) {
            return _.pluck(value, 'field');
        }, []);
    }

    var getValueField = function(field) {
        var values = field.value;
        return _.map(values, function(value) {
            return value.field;
        }, []);
    }

    var formatFieldLink = function(values, field) {   
        return _.map(values, function(value) {
            return ReportFormatterService.formatField(value, field);
        });          
    }

    var formatLinks = function(data, names, index) {  
        if (index == names.length) {
            return;
        }
        return _.map(data, function(item, i) {
            var list = formatLinks(item.vals, names, index + 1);
            var obj = { 'item': ReportFormatterService.formatField(item.key, names[index]) };
            if (list) {
                _.extend(obj, { 'values': list });
            } 
            return obj; 
        });
    }

    var links = function(registers, visio) {
        var filters = getReportFilter(visio.layout); 
        var fields = getValueFields(filters);
        var groupers = DataGrouperService.hierarchy(registers, fields);
        return formatLinks(groupers, filters, 0);
    }

    var link = function(link) {
        //console.log(link)
    }

    return {
        links: links,
        link: link
    }
});