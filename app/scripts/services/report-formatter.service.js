app.factory("ReportFormatterService", function(DataGrouperService){ 

	var format = function(components) {
		console.log(components);
	}
	
	return {
		format: format
	}
});