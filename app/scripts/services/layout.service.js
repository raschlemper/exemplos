app.factory("LayoutService", function(){
	var _optionPreview = {};
	var _configuration = {};
	var _layoutService = {};

	_layoutService.getOptionPreview = function(){
		return _optionPreview;
	};

	_layoutService.setOptionPreview = function(preview){
		_optionPreview = preview;
	};
	_layoutService.getConfiguration = function(){
		return _configuration;
	}
	_layoutService.setConfiguration = function(config){
		_configuration = config;
	}
	return{
		service: _layoutService
	}
});