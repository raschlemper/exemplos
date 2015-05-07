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
            scope.configBlock = function() {
                scope.column = 'col-md-' + scope.columns;
                if (scope.lines) {
                    if(scope.configuracao.preview){
                    scope.height = "height:" + (scope.lines * scope.configuracao.preview.lineHeight) + "px;";
                    }else{
                     scope.height = "height:" + (scope.lines * scope.configuracao.lineHeight) + "px;";
                    }   
                } else {
                    scope.height = "height: 100%;";
                }
                if (scope.offsetRow) {
                    scope.spaceRow = "col-md-offset-" + scope.offset;
                }
                if (scope.offsetLine) {
                    if(scope.configuracao.preview){
                        scope.spaceLine = "margin-top:" + (scope.offsetLine * scope.configuracao.preview.lineHeight) + "px;"
                    }else{
                        scope.spaceLine = "margin-top:" + (scope.offsetLine * scope.configuracao.lineHeight) + "px;"
                    }
                }
                if(scope.configuracao.preview){
                    scope.padding = "padding: 0px !important; padding-right:5px !important";
                }
            }

            scope.isGroup = function() {
                if (scope.group) {
                    scope.inline = "display: inline-group;";
                }
            }

            scope.configBlock();
            scope.isGroup();
        }
    }
}]);
