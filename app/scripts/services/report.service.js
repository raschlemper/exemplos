app.factory("ReportService", function(DataGrouperService, JsonService){   

	var registers = [];
	var layout = [];
    var fields = [];
	var report = {
        title: null,
        pages: []
    };   

    var getFields = function() {
    	if(_.size(fields) > 0) { return; }
        JsonService.camposTest()
            .then( function(data) { 
                fields = data;
            })
            .catch( function(err) {
                fields = [];
            });
    }   

    var getTitle = function() {
    	return layout.title;
    }

    var getPages = function() {
        var fieldsFilter = getFieldsFilter();
        return DataGrouperService.keys(registers, fieldsFilter);
    }

    var getFieldsFilter = function() {
        var fieldsFilter = getFieldsByList(layout.filter);
        var values = _.pluck(fieldsFilter, 'value'); 
        return _.reduce(values, function(memo, value) {
            return _.union(memo, _.pluck(value, 'field'));
        }, []);
    } 

    var getFieldsByList = function(values) {    	
        return _.map(values, function(item, index) {
            return fields[item];
        }); 
    }

    var getComponents = function() {
        var components = [];
        _.map(layout.containers, function(container) {
            _.map(container.components, function(component) {
                components.push(component);
            })
        })
        console.log(_.sortBy(components, 'codigo'));
        return components;   
    }

	var create = function(reg, lay) {
		registers = reg;	
		layout = lay;	
		return setValuesReport();
    }  

    var setValuesReport = function() {
        report.title = getTitle(); 
        report.pages = getPages(); 
	    report.components = getComponents();
		return report;
	};  

    var init = function() {
	    getFields();  
	}();
	
	return {
		create: create
	}
});