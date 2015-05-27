app.factory("ReportService", function(DataGrouperService, ReportComponentService, ReportFormatterService) {

    var report = {
        filter: [],
        pages: [],
        components: []
    };

    var getFieldsFilter = function() {
        var values = _.pluck(report.filter, 'value');
        return _.reduce(values, function(memo, value) {
            return _.union(memo, _.pluck(value, 'field'));
        }, []);
    }

    var getPages = function(registers) {
        var fieldsFilter = getFieldsFilter();
        return DataGrouperService.keys(registers, fieldsFilter);
    }

    var getReportFilter = function() {
        var headerComponents = _.where(report.components, {
            'containerType': 'header'
        });
        return _.reduce(headerComponents, function(memo, component) {
            if (component.data) {
                return _.union(memo, component.data.fields);
            }
        }, []);
    }

    var getComponents = function(container, components) {
        _.map(container.components, function(component) {
            components.push({
                'containerType': container.type,
                'code': component._id,
                'type': component.type,
                'data': component.data
            });
        });
    }

    var getDatasByComponents = function(layout) {
        var components = [];
        _.map(layout.containers, function(container) {
            getComponents(container, components);
        })
        return components;
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

    var createComponent = function(registers, layout) {
        var components = getDatasByComponents(layout);
        return _.map(components, function(component) {
            return componentFactory(registers, component);
        });
    }

    var findComponentByCode = function(code) {
        var comp = _.find(report.components, function(component){ 
            return _.isEqual(component.code, code);
        });
        return comp;
    }

    var setComponent = function(layout, indexContainer, indexComponent, componentReport) {
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

    var bindReport = function(layout) {
        // layout['filter'] = report.filter;
        layout['pages'] = report.pages;
        bindComponents(layout);       
    }

    var setValuesReport = function(registers, layout) {
        report.components = createComponent(registers, layout);
        report.filter = getReportFilter();
        report.pages = getPages(registers);
    }

    var create = function(registers, layout) {
        setValuesReport(registers, layout);
        bindReport(layout);
    }

    return {
        create: create
    }
});