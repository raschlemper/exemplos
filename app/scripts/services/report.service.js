app.factory("ReportService", function(DataGrouperService, JsonService){   

	var registers = [];
	var layout = [];
    var fields = [];
    var componentsData = [];

	var report = {
        title: null,
        filter: [],
        pages: [],
        components: []
    };   

    var getTitle = function() {
        return layout.title;
    }

    var getFieldsFilter = function() {
        var values = _.pluck(report.filter, 'value'); 
        return _.reduce(values, function(memo, value) {
            return _.union(memo, _.pluck(value, 'field'));
        }, []);
    } 

    var getPages = function() {
        var fieldsFilter = getFieldsFilter();
        return DataGrouperService.keys(registers, fieldsFilter);
    }

    var getReportFilter = function() {
        var headerComponents = _.where(report.components, { 'containerType': 'header' });
        return _.reduce(headerComponents, function(memo, component) {
            return _.union(memo, component.data.fields);
        }, []);
    }    

    var getComponents = function(container, components) {
        _.map(container.components, function(component) {
            components.push({ 
                'containerType': container.type,
                'code': component.code,
                'type': component.type,
                'data': component.data 
            })
        })    
    }   

    var getDatasByComponents = function() {
        var components = [];
        _.map(layout.containers, function(container) {
           getComponents(container, components);
        })
        return components;
    }  

	var create = function(reg, lay) {
		registers = reg;	
		layout = lay;	
		return setValuesReport();
    }  

    var setValuesReport = function() {
        report.title = getTitle(); 
        report.components = getDatasByComponents(); 
        report.filter = getReportFilter();
        report.pages = getPages(); 
        console.log('Report', report);
	    // report.components = getComponents();
		return report;
	};  

    var init = function() {
	    // getFields();  
	}();
	
	return {
		create: create
	}
});