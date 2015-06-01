app.factory("ReportService", function(DataGrouperService, ReportPageService, ReportFormatterService) {

    var report = {     
    };

    /* **************************************************************************** */

    /* TODO: Colocar esta método no momento em que o layout esta sendo criado. */

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
       return _.reduce(headerComponents, function(memo, component) {
            if (component.data) {
                return _.union(memo, component.data.fields);
            }
        }, []);
    }

    /* **************************************************************************** */

    var getFieldsFilter = function(filters) {
        var values = _.pluck(filters, 'value');
        return _.reduce(values, function(memo, value) {
            return _.union(memo, _.pluck(value, 'field'));
        }, []);
    }

    var formatFieldLink = function(values, field) {
        console.log(_.uniq(values));
        var fields = []
       _.map(values, function(value) {
            fields.push(ReportFormatterService.formatField(value, field));
        });  
        return _.uniq(fields);          
    }

    var createLinksPage = function(groupers, link) {
        var links = [];
        _.map(groupers, function(grouper) {            
            var filters = ReportFormatterService.formatFields(grouper.key, link.filters);        
            var field = formatFieldLink(grouper.vals, link.field);
            links.push({ 'filters': filters, 'field': field });
        });
        return links;
    }

    var pages = function(registers, visio) {
        var filters = getReportFilter(visio.layout);
        var link = ReportPageService.links(filters);
        var fields = getFieldsFilter(link.filters);
        var groupers = DataGrouperService.group(registers, fields);
        return createLinksPage(groupers, link);
    }

    return {
        pages: pages
    }
});