app.factory("layoutService", function(layoutSettings) {
    var _columns = {};
    var _lines = {};
    var _titleHeight = {};
    var _getHeight = function(maxLines) {
        if (layoutSettings.MAX_LINE === maxLines) {
            return "height: 100%;";
        } else {
            return "height:" + (maxLines * 100) / layoutSettings.MAX_LINE + "%;";
        }
    };
    var _getHeightWithTitle = function(headerLines) {
        percentHeaderHeight = (headerLines - layoutSettings.TITLE_LINE)  * 10;
        _titleHeight = "height:" + layoutSettings.TITLE_LINE * 10 + "%;"
        return "height:" + percentHeaderHeight + "%;";
    };
    var _getTitleHeight = function() {
        return _titleHeight;
    };
    return {
        getHeight: _getHeight,
        getHeightWithTitle: _getHeightWithTitle,
        getTitleHeight: _getTitleHeight
    }
});
