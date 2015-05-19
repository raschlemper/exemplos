app.factory("VisioService", function($http, $q) {
    var _visioService = {};

    _visioService.addVisio = function(visio, callback) {
    	var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.post('/financeiro/visio', visio)
            .success(function(data) {
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
    };
    _visioService.getAll = function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/financeiro/visio')
            .success(function(data) {
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
        return deferred.promise;
    };
    return {
        service: _visioService
    }
});
