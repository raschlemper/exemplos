'use strict';

app.directive('block', [function() {
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        templateUrl: 'scripts/directives/ui-blocks/block.template.html',
        scope: {
            columns: "=",
            offsetRow: "=",
            lines: "=",
            group: "=",
            offsetLine: "=",
            lineHeight: "=",
            component: "=",
            previewBlock: "="
        },
        link: function(scope, element, attrs, ctrls) {
            scope.getColumn = function() {
                return 'col-md-' + scope.columns;
            }

            scope.getRowOffset = function() {
                if (scope.offsetRow) {
                    return "col-md-offset-" + scope.offsetRow;
                }
            }

            scope.getLineOffset = function() {
                if (scope.offsetLine) {
                    return "margin-top:" + (scope.offsetLine * scope.lineHeight) + "px;";
                }
            }

            scope.getHeight = function() {
                if (scope.lines) {
                    return "height:" + (scope.lines * scope.lineHeight) + "px;";
                } else {
                    return "height: 100%;";
                }
            }

            scope.isGroup = function() {
                if (scope.group) {
                    scope.inline = "display: inline-group;";
                }
            }

            scope.previewPadding = function(){
                if(scope.previewBlock){
                    return "padding: 0px;"
                }
            }

        }
    }
}]);
