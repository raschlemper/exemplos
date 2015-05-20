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

    var group = function(data, names, group_names) {
        var stems = keys(data, names);
        return _.map(stems, function(stem) {
            var val = vals(data, stem, names);
            var val_sum = [];
            return {
                key: stem,
                vals: val
            };
        });
    };

    // Métodos Privados

    var sum = function(values, names) {
        var data = {};
        _.map(names, function(name) {
            return data[name] = _.reduce(values, function(memo, item) {
                return memo + Number(_.property(name)(item));
            }, 0); 
        });     
        return data;
    };

    // Métodos Públicos

    return {

        report: function(data, names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                return item;
            });
        },

        sum: function(data, names, group_names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                var val_sum = sum(item.vals, group_names);
                return _.extend({}, item, { 'sum': val_sum });
            });
        }

    }

});