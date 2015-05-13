app.factory("VisioService", function(){
	var _visios = [];
	var _visioService = {};

	_visioService.addVisio = function(visio){
		_visios.push(visio);
	};

	_visioService.getAll = function(){
		return _visios;
	}
	return{
		service: _visioService
	}
});