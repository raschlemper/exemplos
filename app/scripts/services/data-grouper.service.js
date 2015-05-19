app.factory("DataGrouperService", function(){

    var has = function(obj, target) {
        return _.any(obj, function(value) {
            return _.isEqual(value, target);
        });
    };

    var keys = function(data, names) {
        return _.reduce(data, function(memo, item) {
            var key = _.pick(item, names);
            if (!has(memo, key)) {
                memo.push(key);
            }
            return memo;
        }, []);
    };

    var vals = function(data, stem, names) {
        return _.map(_.where(data, stem), function(item) {
            return _.omit(item, names);
        });
    };

    var sum = function(values, names) {
        var data = {};
        _.map(names, function(name) {
            return data[name] = _.reduce(values, function(memo, item) {
                return memo + Number(_.property(name)(item));
            }, 0); 
        });     
        return data;
    };

    var group = function(data, names, group_names) {
        var stems = keys(data, names);
        return _.map(stems, function(stem) {
            var val = vals(data, stem, names);
            var val_sum = [];
            if(sum) { val_sum = sum(val, group_names); }
            return {
                key: stem,
                vals: val,
                sum: val_sum
            };
        });
    };

    group.register = function(name, converter) {
        return group[name] = function(data, names, group_names) {
            return _.map(group(data, names, group_names), converter);
        };
    };

    // Métodos

    group.register("report", function(item) {
    	return item;
	});

    return { 
    	report: group.report
    }

});