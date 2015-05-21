app.factory("ReportService", function(){
	var _blocks = [];
	var _blockService = {};

	_blockService.addBlock = function(block){
		_blocks.push(block);
	};

	_blockService.getAll = function(){
		return _blocks;
	}
	return{
		service: _blockService
	}
});