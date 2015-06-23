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

            var isTable = function() {

                if (scope.type === 'table') {
                    console.log("Table: " + scope.type);
                    console.log(scope.data);
                    scope.table = true;
                }
            };

            var isText = function() {

                if (scope.type === 'text') {
                    console.log("Text: " + scope.type);
                    scope.text = true;
                    if(Object.keys(scope.data[0]).length === 0 ){
                        scope.data[0] = "";
                    }
                }
            }

            var isImage = function() {
                if (scope.type === 'image') {
                    console.log("Image: ", scope.data);
                    scope.image = true;
                }
            }

            var isTitle = function() {
                if (scope.type === 'title') {
                    console.log("Title: " + scope.type);
                    scope.title = true;
                }
            }

            var isList = function() {
                if (scope.type === 'list') {
                    console.log("List: " + scope.type);
                    scope.list = true;
                }
            }

            isTable();
            isText();
            isImage();
            isTitle();
            isList();
        }
    }
}]);
