'use strict';

app.directive('widget', [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'scripts/directives/widget/widget.template.html',
        scope: {
            data: "=",
            type: "="
        },
        link: function(scope, element, attrs, ctrls) {
            
            scope.isTable = function(){
                if(type==='table'){
                    return true;
                }
            };

            scope.isText = function(){
                if(type==='text'){
                    return true;
                }
            }

            scope.isImage = function(){
                if(type==='image'){
                    return true;
                }
            }

            scope.isTitle = function(){
                if(type==='title'){
                    return true;
                }
            }
        }
    }
}]);
