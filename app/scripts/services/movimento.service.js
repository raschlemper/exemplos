'use strict';

app.factory("ReportService", function($http, $q){

    return {

        movimento: function(user, callback) {
	        var cb = callback || angular.noop;
	        var deferred = $q.defer();
	        $http.get('/financeiro/movimento')
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

    }
});