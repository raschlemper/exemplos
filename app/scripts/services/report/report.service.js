app.factory("ReportNewService", function(DataGrouperService, PageService, FormatterService,
    ReportPageService, ReportComponentService, ReportFormatterService) {

    var report = {};
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
            if (!component.data) {
                component.data = {};
            }
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
            if (index == 0) {
                values = getList(link.values, value, index);
            } else {
                values = getList(values, value, index);
            }
        });
        getLinks(values);
    }

    var getList = function(values, value, index) {         
        var selectedIndex = getIndexSelectList(values, value);
        link.lists.push({
            'id': index,
            'itens': _.pluck(values, 'item'),
            'selected': values[selectedIndex].item
        });
        return values[selectedIndex].values;
    }

    var getLinks = function(values) {
        var itens = _.pluck(values, 'item');
        link.links = itens;
    }

    var setValueSelected = function(data, index, indexModify) {
        if (data) {
            var selectedIndex = getIndexSelectList(data, link.selected[index]);
            var value = data[selectedIndex];            
            if(!value.values) { return; }
            if (link.selected[index]) {
                if (index > indexModify) {
                    link.selected[index] = value.item.key;
                }
            } else {
                link.selected.push(value.item.key);                
            }
            setValueSelected(value.values, index + 1, indexModify);
        }
    }

    var getIndexSelectList = function(data, selected) {
        var itens = _.pluck(data, 'item');
        var keys = _.pluck(itens, 'key');
        var selectedIndex = _.indexOf(keys, selected);
        if(selectedIndex < 0) {
            return 0;
        }
        return selectedIndex;
    }

    /* **************************************************************************** */

    var getValueFields = function(filters) {
        var values = _.pluck(filters, 'value');
        var keys = _.pluck(filters, 'key');
        return _.map(keys, function(key, index) {
            var valueField = _.pluck(values[index], 'field');
            var keyField = _.pluck(key, 'field');
            return _.union(valueField, keyField);
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
            var obj = {
                'item': FormatterService.formatField(item.key, names[index])
            };
            if (list) {
                _.extend(obj, {
                    'values': list
                });
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
        setValueSelected(link.values, 0, 0);
        createList();
        return link;
    }

    var getLink = function(value, index) {
        link.selected[index] = value;
        setValueSelected(link.values, 0, index);
        createList();
        return link;
    }


    /* *************************** ALTERAR **************************** */

    var findComponentByCode = function(code) {
        var comp = _.find(report.components, function(component){ 
            return _.isEqual(component.code, code);
        });
        return comp;
    }

    var setComponent = function(layout, indexContainer, indexComponent, componentReport) {
        if(!componentReport.rows) return;
        layout.containers[indexContainer].components[indexComponent].data = componentReport.rows;
    }

    var bindComponents = function(layout) {
        _.map(layout.containers, function(container, indexContainer) {
            _.map(container.components, function(component, indexComponent) {               
                componentReport = findComponentByCode(component._id);
                setComponent(layout, indexContainer, indexComponent, componentReport);
            });
        });
    }

    var createComponentWithoutField = function(registers, component) {
        component['values'] = ReportComponentService.createComponentWithoutField(registers, component);
        component['rows'] = ReportFormatterService.formatWithoutFields(component);
        return component;
    }

    var createComponentField = function(registers, component) {
        component['values'] = ReportComponentService.createComponentField(registers, component);
        component['rows'] = ReportFormatterService.formatFields(component);
        return component;
    }

    var createComponentGroup = function(registers, component) {
        component['values'] = ReportComponentService.createComponentGroup(registers, component);
        component['rows'] = ReportFormatterService.formatGroups(component);
        return component;
    }

    var componentFactory = function(registers, component) {
        if (!component.data) {
            return;
        }
        if (component.data.groups) {
            return createComponentGroup(registers, component);
        }
        if (component.data.fields) {
            return createComponentField(registers, component);
        }
        return createComponentWithoutField(registers, component);
    }

    var createComponent = function(registers, components) {
        return _.map(components, function(component) {
            return componentFactory(registers, component);
        });
    }

    var page = function(page, registers, layout) {
        var components = getComponents(layout);
        var filters = ReportPageService.page(page, registers);
        report.components = createComponent(filters, components);
        bindComponents(layout);
    }

    return {
        links: links,
        link: getLink,
        page: page
    }
});