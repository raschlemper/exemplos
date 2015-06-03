app.factory("ReportPageService", function(DataGrouperService) {

    var removeLinkFromFields = function(fields, field) {
        return _.without(fields, field);
    }

    var getLink = function(fields) {
        return _.max(fields, function(field) {
            return field.order;
        });
    }

    var createLinkPage = function(fields) {   
        var fieldLink = _.last(fields);//getLink(fields);    
        var filters = removeLinkFromFields(fields, fieldLink);
        return {
            'filters': filters,
            'field': fieldLink
        };
    }

    var links = function(fields) {
        return createLinkPage(fields);
    }

    return {
        links: links
    }

});