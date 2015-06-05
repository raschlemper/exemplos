app.factory("ReportNewService", function(DataGrouperService, PageService, FormatterService) {

    var report = { 
    };
    var link = {
        selected: [],
        values: [],
        lists: [],
        links: []
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
    

    /* *********************************** BREACRUMBS ***************************** */

    var createList = function() {
        link.lists = []; 
        link.links = []; 
        var values = []; 
        _.map(link.selected, function(value, index) {
            if(index == 0) { 
                values = getList(link.values, value, index);
            } else {
                values = getList(values, value, index);
            }
        });  
        getLinks(values);
    }

    var getList = function(values, value, index) {
        var itens = _.pluck(values, 'item');
        var selected = itens[value];
        link.lists.push({ 'id': index, 'itens': itens, 'selected': selected }); 
        return values[value].values;
    }

    var getLinks = function(values) {
        var itens = _.pluck(values, 'item');
        link.links = itens; 
    }

    var createListValuesDefault = function(values) {
        if(link.selected.size == 0) return;
        link.selected = [];
        setValueDefault(link.values[0]);
    }  
    var setValueDefault = function(data) {
        var values = data.values;
        if(values) {
            link.selected.push(0);
            setValueDefault(values[0]);
        }
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
            return FormatterService.formatField(value, field);
        });          
    }

    var formatLinks = function(data, names, index) {  
        if (index == names.length) {
            return;
        }
        return _.map(data, function(item, i) {
            var list = formatLinks(item.vals, names, index + 1);
            var obj = { 'item': FormatterService.formatField(item.key, names[index]) };
            if (list) {
                _.extend(obj, { 'values': list });
            } 
            return obj; 
        });
    }

    var createLinks = function(registers, visio) {
        var filters = getReportFilter(visio.layout); 
        var fields = getValueFields(filters);
        var groupers = DataGrouperService.hierarchy(registers, fields);
        link.values = formatLinks(groupers, filters, 0);
    }

    var links = function(registers, visio) {
        createLinks(registers, visio);
        createListValuesDefault();
        createList();
        return link;
    }

    var getLink = function(value, index) {
        link.selected[index] = value;   
        createList(); 
        return link;          
    } 

    return {
        links: links,
        link: getLink
    }
});