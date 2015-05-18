app.factory("LayoutService", function($http, $q) {
    var _optionPreview = {};
    var _configuration = {};
    var _layoutService = {};

    _layoutService.getOptionPreview = function() {
        return _optionPreview;
    };

    _layoutService.setOptionPreview = function(preview) {
        _optionPreview = preview;
    };
    _layoutService.getConfiguration = function() {
        return _configuration;
    };
    _layoutService.setConfiguration = function(config) {
        _configuration = config;
    };
    _layoutService.getAll = function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/financeiro/layout')
            .success(function(data) {
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
        return deferred.promise;
    }

    return {
        service: _layoutService
    }
});
