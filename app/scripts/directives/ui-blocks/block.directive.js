'use strict';

app.directive('block', [function() {
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        templateUrl: 'scripts/directives/ui-blocks/block.template.html',
        require: ['^layout'],
        scope: {
            columns: "=",
            offsetRow: "=",
            lines: "=",
            group: "=",
            offsetLine: "="
        },
        link: function(scope, element, attrs, ctrls) {
            scope.layoutCtrl = ctrls[0];
            scope.configuracao = scope.layoutCtrl.getConfiguration();

            scope.getColumn = function() {
                return 'col-md-' + scope.columns;
            }

            scope.getRowOffset = function() {
                if (scope.offset) {
                    return "col-md-offset-" + scope.offset;
                }
            }

            scope.getLineOffset = function() {
                if (scope.offsetLine) {
                    if (scope.layoutCtrl.isPreview()) {
                        return "margin-top:" + (scope.offsetLine * scope.configuracao.preview.lineHeight) + "px;"
                    } else {
                        return "margin-top:" + (scope.offsetLine * scope.configuracao.lineHeight) + "px;"
                    }
                }

            }

            scope.getPadding = function() {
                if (scope.layoutCtrl.isPreview()) {
                    return "padding: 0px !important; padding-right:2px !important;";
                }
            }

            scope.getHeight = function() {
                if (scope.lines) {
                    if (scope.layoutCtrl.isPreview()) {
                        return "height:" + (scope.lines * scope.configuracao.preview.lineHeight) + "px;";
                    } else {
                        return "height:" + (scope.lines * scope.configuracao.lineHeight) + "px;";
                    }
                } else {
                    return "height: 100%;";
                }
            }

            scope.isGroup = function() {
                if (scope.group) {
                    scope.inline = "display: inline-group;";
                }
            }


        }
    }
}]);
