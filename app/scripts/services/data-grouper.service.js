app.factory("DataGrouperService", function() {

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

    var group = function(data, names) {
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

    var recursive = function(data, names, index) {
        if (index == names.length) {
            return;
        }
        var groups = group(data, names[index]);
        return _.map(groups, function(item, i) {
            var lista = recursive(item.vals, names, index + 1);
            var obj = item.key;
            if (lista) {
                return _.extend(obj, lista);
            }
            return obj;
        });
    }

    return {

        group: function(data, names) {
            return group(data, names);
        },

        keys: function(data, names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                return item.key;
            });
        },

        vals: function(data, names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                return item.vals;
            });
        },

        groupFields: function(data, names, fields) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                var values = [];
                _.map(item.vals, function(value) {
                    var valueFileds = _.pick(value, fields);
                    if (_.where(values, valueFileds).length == 0) {
                        values.push(valueFileds);
                    }
                });
                item.vals = values;
                return item;
            });
        },

        links: function(data, names) {
            return recursive(data, names, 0);
        }

    }

});
