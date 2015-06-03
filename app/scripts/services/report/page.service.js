app.factory("ReportPageService", function(DataGrouperService) {

    var removeLinkFromFields = function(fields, field) {
        return _.without(fields, field);
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