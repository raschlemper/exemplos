'use strict';

app.factory("JsonService", function($http, $q){

    return {

        movimento: function(callback) {
            //json('data/movimento.json', callback);
            var cb = callback || angular.noop;
	        var deferred = $q.defer();
			$http.get('data/movimento.json')
	            .success(function(data) {
	            	deferred.resolve(data);
	                return cb(data);
	            })
	            .error(function(error) {
	            	deferred.reject(err);
	                return cb(err);
	            }.bind(this));
            return deferred.promise;
        }

    }
});