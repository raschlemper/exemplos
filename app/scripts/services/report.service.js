app.factory("ReportService", function(DataGrouperService, ReportComponentService, ReportFormatterService, 
    ReportPageService) {

    var report = {
        components: []
    };

    var createComponents = function(container, components) {
        _.map(container.components, function(component) {
            components.push({
                'containerType': container.type,
                'code': component._id,
                'type': component.type,
                'data': component.data
            });
        });
    }

    var getComponents = function(layout) {
        var components = [];
        _.map(layout.containers, function(container) {
            createComponents(container, components);
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

    var createComponent = function(registers, components) {
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

    var page = function(page, registers, layout) {
        var components = getComponents(layout);
        var filters = ReportPageService.page(page, registers);
        report.components = createComponent(filters, components);
        bindComponents(layout);
    }

    var pages = function(registers, layout) {
        var components = getComponents(layout);
        return ReportPageService.pages(registers, components); 
    }

    return {
        pages: pages,
        page: page
    }
});